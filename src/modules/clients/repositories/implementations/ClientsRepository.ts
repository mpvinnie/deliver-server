import { Client } from '@prisma/client'
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO'
import { IClientsRepository } from '../interfaces/IClientsRepository'

import { prisma } from '../../../../shared/prisma'

export class ClientsRepository implements IClientsRepository {
  async create({ username, password }: ICreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        username,
        password
      }
    })

    return client
  }

  async findByUsername(username: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id }
    })

    return client
  }
}