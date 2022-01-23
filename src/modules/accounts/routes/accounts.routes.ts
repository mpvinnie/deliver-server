import { Router } from 'express'
import { AuthenticateClientController } from '../useCases/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from '../useCases/authenticateDeliveryman/AuthenticateDeliverymanController'

export const accountsRoutes = Router()

accountsRoutes.post('/client', new AuthenticateClientController().handle)
accountsRoutes.post('/deliveryman', new AuthenticateDeliverymanController().handle)