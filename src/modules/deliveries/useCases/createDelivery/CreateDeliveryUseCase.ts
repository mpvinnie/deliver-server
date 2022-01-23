import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IClientsRepository } from '../../../clients/repositories/interfaces/IClientsRepository'
import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../../repositories/interfaces/IDeliveriesRepository'

@injectable()
export class CreateDeliveryUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository
  ) { }

  async execute({ item_name, id_client }: ICreateDeliveryDTO) {
    const client = await this.clientsRepository.findById(id_client)

    if (!client) {
      throw new AppError('You cannot create a delivery to a non-existent client', 404)
    }

    const delivery = await this.deliveriesRepository.create({
      item_name,
      id_client
    })

    return delivery
  }
}