import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDeliverersRepository } from '../../../deliverers/repositories/interfaces/IDeliverersRepository';
import { IFinishDeliveryDTO } from '../../dtos/IFinishDeliveryDTO'
import { IDeliveriesRepository } from '../../repositories/interfaces/IDeliveriesRepository';

@injectable()
export class FinishDeliveryUseCase {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository
  ) { }

  async execute({ deliveryman_id, accepted_delivery_id }: IFinishDeliveryDTO) {
    const deliveryman = await this.deliverersRepository.findById(deliveryman_id)

    if (!deliveryman) {
      throw new AppError('No deliveryman found for this id', 404)
    }

    const delivery = await this.deliveriesRepository.findAcceptedByDeliverymanId(accepted_delivery_id, deliveryman_id)

    if (!delivery) {
      throw new AppError('You cannot finish this delivery')
    }

    if (delivery.end_at) {
      throw new AppError('This delivery is already finished')
    }

    delivery.end_at = new Date()

    const finishedDelivery = await this.deliveriesRepository.update(delivery)

    return finishedDelivery
  }
}