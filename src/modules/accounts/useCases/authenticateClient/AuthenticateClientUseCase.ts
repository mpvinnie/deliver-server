import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IHashProvider } from '../../../clients/providers/hashProvider/interfaces/IHashProvider'
import { sign } from 'jsonwebtoken'
import { jwt } from '../../../../config/auth'

import { IClientsRepository } from '../../../clients/repositories/interfaces/IClientsRepository'
import { IAuthenticateClientDTO } from '../../dtos/IAuthenticateClientDTO'
import { exclude } from '../../../../utils/exclude'

@injectable()
export class AuthenticateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ username, password }: IAuthenticateClientDTO) {
    const client = await this.clientsRepository.findByUsername(username)

    if (!client) {
      throw new AppError('Username or password invalid!', 401)
    }

    const passwordMatch = await this.hashProvider.comparePassowrd(password, client.password)

    if (!passwordMatch) {
      throw new AppError('Username or password invalid!', 401)
    }

    const { client_secret, expiresIn } = jwt

    const token = sign({ username }, client_secret, {
      subject: client.id,
      expiresIn: expiresIn
    })

    const secureClient = exclude(client, 'password')

    return {
      client: secureClient,
      token
    }
  }
}