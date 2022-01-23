import { Deliveryman } from '@prisma/client'
import { ICreateDeliverymanDTO } from '../../dtos/ICreateDelivermanDTO'
import { IDeliverersRepository } from '../interfaces/IDeliverersRepository'
import { v4 as uuid } from 'uuid'

export class DeliverersRepositoryInMemory implements IDeliverersRepository {
  private deliverers: Deliveryman[] = []

  async create({ username, password }: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliveryman: Deliveryman = {
      id: uuid(),
      username,
      password
    }

    this.deliverers.push(deliveryman)

    return deliveryman
  }

  async findByUsername(username: string): Promise<Deliveryman | undefined> {
    return this.deliverers.find(delivery => delivery.username === username)
  }
}