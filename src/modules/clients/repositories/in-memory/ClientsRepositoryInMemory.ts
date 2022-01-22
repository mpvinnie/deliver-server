import { Client } from '@prisma/client'
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO'
import { IClientsRepository } from '../interfaces/IClientsRepository'
import { v4 as uuid } from 'uuid'

export class ClientsRepositoryInMemory implements IClientsRepository {
  private clients: Client[] = []

  async create({ username, password }: ICreateClientDTO): Promise<Client> {
    const client: Client = {
      id: uuid(),
      username,
      password
    }

    this.clients.push(client)

    return client
  }

  async findByUsername(username: string): Promise<Client | undefined> {
    return this.clients.find(client => client.username === username)
  }

}