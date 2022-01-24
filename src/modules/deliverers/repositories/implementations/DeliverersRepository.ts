import { Delivery, Deliveryman } from '@prisma/client'
import { ICreateDeliverymanDTO } from '../../dtos/ICreateDelivermanDTO'
import { IDeliverersRepository } from '../interfaces/IDeliverersRepository'

import { prisma } from '../../../../shared/prisma'

export class DeliverersRepository implements IDeliverersRepository {
  async create({ username, password }: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password
      }
    })

    return deliveryman
  }

  async findByUsername(username: string): Promise<Deliveryman | null> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    return deliveryman
  }

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id
      }
    })

    return deliveryman
  }

  async findDeliverymanDeliveries(deliveryman_id: string): Promise<(Deliveryman & { deliveries: Delivery[] }) | null> {
    const deliverymaneDeliveries = await prisma.deliveryman.findUnique({
      where: {
        id: deliveryman_id
      },
      include: {
        deliveries: true
      }
    })

    return deliverymaneDeliveries
  }
}