import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListClientDeliveriesUseCase } from './ListClientDeliveriesUseCase'

export class ListClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request

    const listClientDeliveries = container.resolve(ListClientDeliveriesUseCase)

    const clientDeliveries = await listClientDeliveries.execute(id_client)

    return response.json(clientDeliveries)
  }
}