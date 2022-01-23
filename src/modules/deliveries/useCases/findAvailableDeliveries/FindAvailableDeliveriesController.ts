import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindAvailableDeliveriesUseCase } from './FindAvailableDeliveriesUseCase'

export class FindAvailableDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAvailableDeliveries = container.resolve(FindAvailableDeliveriesUseCase)

    const availableDeliveries = await findAvailableDeliveries.execute()

    return response.json(availableDeliveries)
  }
}