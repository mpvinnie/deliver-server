import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IDeliverersRepository } from '../../../deliverers/repositories/interfaces/IDeliverersRepository'
import { IAcceptDeliveryDTO } from '../../dtos/IAcceptDeliveryDTO'
import { IDeliveriesRepository } from '../../repositories/interfaces/IDeliveriesRepository'

@injectable()
export class AcceptDeliveryUseCase {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository
  ) { }

  async execute({ delivery_id, deliveryman_id }: IAcceptDeliveryDTO) {
    const deliveryman = await this.deliverersRepository.findById(deliveryman_id)

    if (!deliveryman) {
      throw new AppError('No deliveryman found for this id', 404)
    }

    const delivery = await this.deliveriesRepository.findById(delivery_id)

    if (!delivery) {
      throw new AppError('You cannot accept a non-existent delivery', 404)
    }

    delivery.id_deliveryman = deliveryman_id

    const acceptedDelivery = await this.deliveriesRepository.update(delivery)

    return acceptedDelivery
  }
}