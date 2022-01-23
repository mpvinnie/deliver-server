import { Delivery } from '@prisma/client';
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO';
import { IDeliveriesRepository } from '../interfaces/IDeliveriesRepository'

import { prisma } from '../../../../shared/prisma'

export class DeliveriesRepository implements IDeliveriesRepository {
  async create({ item_name, id_client }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        id_client
      }
    })

    return delivery
  }

  async findAvailables(): Promise<Delivery[]> {
    const availableDeliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null
      }
    })

    return availableDeliveries
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findFirst({
      where: {
        id
      }
    })

    return delivery
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const updatedDelivery = await prisma.delivery.update({
      where: {
        id: delivery.id
      },
      data: delivery
    })

    return updatedDelivery
  }
}