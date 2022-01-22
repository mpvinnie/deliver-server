import { Router } from 'express'
import { CreateClientController } from '../useCases/createClient/CreateClientController'

export const clientsRoutes = Router()

clientsRoutes.post('/', new CreateClientController().handle)