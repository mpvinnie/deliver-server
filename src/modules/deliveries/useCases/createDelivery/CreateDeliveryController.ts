import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name } = request.body
    const { id_client } = request

    const createDelivery = container.resolve(CreateDeliveryUseCase)

    const delivery = await createDelivery.execute({
      item_name,
      id_client
    })

    return response.status(201).json(delivery)
  }
}