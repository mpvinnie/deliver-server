import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../shared/errors/AppError'
import { IHashProvider } from '../../../clients/providers/hashProvider/interfaces/IHashProvider'
import { ICreateDeliverymanDTO } from '../../dtos/ICreateDelivermanDTO'
import { IDeliverersRepository } from '../../repositories/interfaces/IDeliverersRepository'

@injectable()
export class CreateDeliverymanUseCase {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ username, password }: ICreateDeliverymanDTO) {
    const deliverymanExist = await this.deliverersRepository.findByUsername(username)

    if (deliverymanExist) {
      throw new AppError('A deliveryman with this username is already registered!')
    }

    const hashedPassword = await this.hashProvider.hashPassword(password)

    const deliveryman = await this.deliverersRepository.create({
      username,
      password: hashedPassword
    })

    return deliveryman
  }
}