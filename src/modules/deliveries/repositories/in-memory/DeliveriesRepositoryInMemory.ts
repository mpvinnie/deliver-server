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
}