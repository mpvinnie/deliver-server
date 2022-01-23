import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliveryUseCase'

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateDeliveryman = container.resolve(AuthenticateDeliverymanUseCase)

    const { deliveryman, token } = await authenticateDeliveryman.execute({
      username,
      password
    })

    return response.json({ deliveryman, token })
  }
}