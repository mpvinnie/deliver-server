import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AcceptDeliveryUseCase } from './AcceptDeliveryUseCase'

export class AcceptDeliveryController {
  async handle(request: Request, response: Response) {
    const { id: delivery_id } = request.params

    const { id_deliveryman } = request

    const acceptDelivery = container.resolve(AcceptDeliveryUseCase)

    const acceptedDelivery = await acceptDelivery.execute({
      delivery_id,
      deliveryman_id: id_deliveryman
    })

    return response.json(acceptedDelivery)
  }
}