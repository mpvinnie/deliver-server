import { Request, Response } from 'express'
import { BCryptHashProvider } from '../../providers/hashProvider/implementations/BCryptHashProvider'
import { ClientsRepository } from '../../repositories/implementations/ClientsRepository'
import { CreateClientUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const clientsRepository = new ClientsRepository()
    const hashProvider = new BCryptHashProvider()

    const createClient = new CreateClientUseCase(clientsRepository, hashProvider)

    const client = await createClient.execute({
      username,
      password
    })

    return response.status(201).json(client)
  }
}