import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { exclude } from '../../../../utils/exclude'
import { IDeliverersRepository } from '../../repositories/interfaces/IDeliverersRepository'

@injectable()
export class ListDeliverymanDeliveriesUseCase {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository
  ) { }

  async execute(deliveryman_id: string) {
    const deliverymanDeliveries = await this.deliverersRepository.findDeliverymanDeliveries(deliveryman_id)

    if (!deliverymanDeliveries) {
      throw new AppError('No deliveryman deliveries found for this deliveryman id', 404)
    }

    const secureDeliverymanDeliveries = exclude(deliverymanDeliveries, 'password')

    return secureDeliverymanDeliveries
  }
}