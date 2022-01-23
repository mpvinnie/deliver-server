import { Router } from 'express'
import { ensureAuthenticatedClient } from '../../../shared/middlewares/ensureAuthenticatedClient'
import { ensureAuthenticatedDeliveryman } from '../../../shared/middlewares/ensureAuthenticatedDeliveryman'
import { CreateDeliveryController } from '../useCases/createDelivery/CreateDeliveryController'
import { FindAvailableDeliveriesController } from '../useCases/findAvailableDeliveries/FindAvailableDeliveriesController'

export const deliveriesRoutes = Router()

deliveriesRoutes.post('/', ensureAuthenticatedClient, new CreateDeliveryController().handle)
deliveriesRoutes.get('/availables', ensureAuthenticatedDeliveryman, new FindAvailableDeliveriesController().handle)
