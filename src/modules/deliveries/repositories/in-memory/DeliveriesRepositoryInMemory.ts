import { Delivery } from '@prisma/client'
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../interfaces/IDeliveriesRepository'
import { v4 as uuid } from 'uuid'

export class DeliveriesRepositoryInMemory implements IDeliveriesRepository {
  private deliveries: Delivery[] = []

  async create({ item_name, id_client }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery: Delivery = {
      id: uuid(),
      item_name,
      id_client,
      id_deliveryman: null,
      created_at: new Date(),
      end_at: null,
    }

    this.deliveries.push(delivery)

    return delivery
  }

  async findAvailables(): Promise<Delivery[]> {
    return this.deliveries.filter(delivery => !delivery.end_at && !delivery.id_deliveryman)
  }

  async findById(id: string): Promise<Delivery | undefined> {
    return this.deliveries.find(delivery => delivery.id === id)
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const findIndex = this.deliveries.findIndex(currentDelivery => currentDelivery.id === delivery.id)

    this.deliveries[findIndex] = delivery

    return this.deliveries[findIndex]
  }

  async findAcceptedByDeliverymanId(accepted_delivery_id: string, deliveryman_id: string): Promise<Delivery | null | undefined> {
    return this.deliveries.find(delivery => delivery.id === accepted_delivery_id && delivery.id_deliveryman === deliveryman_id)
  }
}