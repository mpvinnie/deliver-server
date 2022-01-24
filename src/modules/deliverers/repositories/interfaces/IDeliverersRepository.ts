import { Delivery, Deliveryman } from '@prisma/client'
import { ICreateDeliverymanDTO } from '../../dtos/ICreateDelivermanDTO'

export interface IDeliverersRepository {
  create(data: ICreateDeliverymanDTO): Promise<Deliveryman>
  findByUsername(username: string): Promise<Deliveryman | undefined | null>
  findById(id: string): Promise<Deliveryman | undefined | null>
  findDeliverymanDeliveries(deliveryman_id: string): Promise<Deliveryman & { deliveries: Delivery[] } | null | undefined>
}