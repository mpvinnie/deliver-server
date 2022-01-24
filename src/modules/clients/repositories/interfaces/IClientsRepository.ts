import { Client, Delivery } from '@prisma/client'
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO'

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>
  findByUsername(username: string): Promise<Client | null | undefined>
  findById(id: string): Promise<Client | null | undefined>
  findClientDeliveries(id: string): Promise<Client & { deliveries: Delivery[] } | null | undefined>
}