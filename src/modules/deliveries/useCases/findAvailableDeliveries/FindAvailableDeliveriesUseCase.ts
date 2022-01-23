import { inject, injectable } from 'tsyringe'
import { IDeliveriesRepository } from '../../repositories/interfaces/IDeliveriesRepository'

@injectable()
export class FindAvailableDeliveriesUseCase {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepository: IDeliveriesRepository
  ) { }

  async execute() {
    const availableDeliveries = await this.deliveriesRepository.findAvailables()

    return availableDeliveries
  }
}