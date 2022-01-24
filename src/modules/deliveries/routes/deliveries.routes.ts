import { Router } from 'express'
import { ensureAuthenticatedClient } from '../../../shared/middlewares/ensureAuthenticatedClient'
import { ensureAuthenticatedDeliveryman } from '../../../shared/middlewares/ensureAuthenticatedDeliveryman'
import { AcceptDeliveryController } from '../useCases/acceptDelivery/AcceptDeliveryController'
import { CreateDeliveryController } from '../useCases/createDelivery/CreateDeliveryController'
import { FindAvailableDeliveriesController } from '../useCases/findAvailableDeliveries/FindAvailableDeliveriesController'
import { FinishDeliveryController } from '../useCases/finishDelivery/FinishDeliveryController'

export const deliveriesRoutes = Router()

deliveriesRoutes.post('/', ensureAuthenticatedClient, new CreateDeliveryController().handle)
deliveriesRoutes.get('/availables', ensureAuthenticatedDeliveryman, new FindAvailableDeliveriesController().handle)
deliveriesRoutes.patch('/accept/:id', ensureAuthenticatedDeliveryman, new AcceptDeliveryController().handle)
deliveriesRoutes.patch('/finish/:id', ensureAuthenticatedDeliveryman, new FinishDeliveryController().handle)