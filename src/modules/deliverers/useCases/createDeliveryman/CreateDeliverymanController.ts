import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createDeliveryman = container.resolve(CreateDeliverymanUseCase)

    const deliveryman = await createDeliveryman.execute({
      username,
      password
    })

    return response.status(201).json(deliveryman)
  }
}