import { Client, Delivery } from '@prisma/client'
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

  async findById(id: string): Promise<Client | undefined> {
    return this.clients.find(client => client.id === id)
  }

  async findClientDeliveries(id: string): Promise<Client & { deliveries: Delivery[] } | undefined> {
    const client = this.clients.find(client => client.id === id)

    if (!client) {
      return client
    }

    const clientDeliveries = {
      id: client.id,
      username: client.username,
      password: client.password,
      deliveries: []
    }

    return clientDeliveries
  }
}