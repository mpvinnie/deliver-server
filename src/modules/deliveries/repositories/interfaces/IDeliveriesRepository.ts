import { Delivery } from '@prisma/client'
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO'

export interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>
  findAvailables(): Promise<Delivery[]>
  findById(id: string): Promise<Delivery | null | undefined>
  update(delivery: Delivery): Promise<Delivery>
}