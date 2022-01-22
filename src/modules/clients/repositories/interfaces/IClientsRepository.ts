import { Client } from '@prisma/client'
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO'

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>
  findByUsername(username: string): Promise<Client | null | undefined>
}