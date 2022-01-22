import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'

import { ICreateClientDTO } from '../../dtos/ICreateClientDTO'

import { IClientsRepository } from '../../repositories/interfaces/IClientsRepository'
import { IHashProvider } from '../../providers/hashProvider/interfaces/IHashProvider'


@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  async execute({ password, username }: ICreateClientDTO) {
    const clientExist = await this.clientsRepository.findByUsername(username)

    if (clientExist) {
      throw new AppError('A client with this username is already registered!')
    }

    const hashedPassword = await this.hashProvider.hashPassword(password)

    const client = await this.clientsRepository.create({
      username,
      password: hashedPassword
    })

    return client
  }
}