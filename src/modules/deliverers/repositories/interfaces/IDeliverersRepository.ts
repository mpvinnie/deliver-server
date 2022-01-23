import { Deliveryman } from '@prisma/client'
import { ICreateDeliverymanDTO } from '../../dtos/ICreateDelivermanDTO'

export interface IDeliverersRepository {
  create(data: ICreateDeliverymanDTO): Promise<Deliveryman>
  findByUsername(username: string): Promise<Deliveryman | undefined | null>
}