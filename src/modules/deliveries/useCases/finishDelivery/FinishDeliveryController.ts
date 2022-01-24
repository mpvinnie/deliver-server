import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FinishDeliveryUseCase } from './FinishDeliveryUseCase'

export class FinishDeliveryController {
  async handle(request: Request, response: Response) {
    const { id: accepted_delivery_id } = request.params

    const { id_deliveryman } = request

    const finishDelivery = container.resolve(FinishDeliveryUseCase)

    const finishedDelivery = await finishDelivery.execute({
      accepted_delivery_id,
      deliveryman_id: id_deliveryman
    })

    return response.json(finishedDelivery)
  }
}