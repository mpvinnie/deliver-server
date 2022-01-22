import { Router } from 'express'
import { AuthenticateClientController } from '../useCases/authenticateClient/AuthenticateClientController'

export const accountsRoutes = Router()

accountsRoutes.post('/', new AuthenticateClientController().handle)