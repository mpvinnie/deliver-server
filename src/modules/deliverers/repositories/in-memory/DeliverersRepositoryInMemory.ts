import { Delivery, Deliveryman } from '@prisma/client'
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

  async findById(id: string): Promise<Deliveryman | undefined> {
    return this.deliverers.find(delivery => delivery.id === id)
  }

  async findDeliverymanDeliveries(deliveryman_id: string): Promise<(Deliveryman & { deliveries: Delivery[] }) | undefined> {
    const deliveryman = this.deliverers.find(delivery => delivery.id === deliveryman_id)

    if (!deliveryman) {
      return
    }

    const deliverymanDeliveries = {
      ...deliveryman,
      deliveries: []
    }

    return deliverymanDeliveries
  }
}