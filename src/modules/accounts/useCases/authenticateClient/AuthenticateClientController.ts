import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase'

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateClient = container.resolve(AuthenticateClientUseCase)

    const { client, token } = await authenticateClient.execute({
      username,
      password
    })

    return response.json({ client, token })
  }
}