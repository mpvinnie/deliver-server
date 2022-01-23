import { Router } from 'express'
import { ensureAuthenticatedClient } from '../../../shared/middlewares/ensureAuthenticatedClient'
import { CreateDeliveryController } from '../useCases/createDelivery/CreateDeliveryController'

export const deliveriesRoutes = Router()

deliveriesRoutes.use(ensureAuthenticatedClient)

deliveriesRoutes.post('/', new CreateDeliveryController().handle)
