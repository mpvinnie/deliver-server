import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDeliverymanDeliveriesUseCase } from './ListDeliverymanDeliveriesUseCase'

export class ListDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request

    const listDeliverymanDeliveries = container.resolve(ListDeliverymanDeliveriesUseCase)

    const deliverymanDeliveries = await listDeliverymanDeliveries.execute(id_deliveryman)

    return response.json(deliverymanDeliveries)
  }
}