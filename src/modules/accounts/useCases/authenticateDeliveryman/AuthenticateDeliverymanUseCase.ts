import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IHashProvider } from '../../../clients/providers/hashProvider/interfaces/IHashProvider'
import { sign } from 'jsonwebtoken'
import { jwt } from '../../../../config/auth'

import { exclude } from '../../../../utils/exclude'
import { IDeliverersRepository } from '../../../deliverers/repositories/interfaces/IDeliverersRepository'
import { IAuthenticateDeliverymanDTO } from '../../dtos/IAuthenticateDeliverymanDTO'

@injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ username, password }: IAuthenticateDeliverymanDTO) {
    const deliveryman = await this.deliverersRepository.findByUsername(username)

    if (!deliveryman) {
      throw new AppError('Username or password invalid!', 401)
    }

    const passwordMatch = await this.hashProvider.comparePassowrd(password, deliveryman.password)

    if (!passwordMatch) {
      throw new AppError('Username or password invalid!', 401)
    }

    const { deliveryman_secret, expiresIn } = jwt

    const token = sign({ username }, deliveryman_secret, {
      subject: deliveryman.id,
      expiresIn: expiresIn
    })

    const secureDeliveryman = exclude(deliveryman, 'password')

    return {
      deliveryman: secureDeliveryman,
      token
    }
  }
}