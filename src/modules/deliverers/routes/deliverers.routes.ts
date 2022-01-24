import { Router } from 'express'
import { ensureAuthenticatedDeliveryman } from '../../../shared/middlewares/ensureAuthenticatedDeliveryman'

import { CreateDeliverymanController } from '../useCases/createDeliveryman/CreateDeliverymanController'
import { ListDeliverymanDeliveriesController } from '../useCases/listDeliverymanDeliveries/ListDeliverymanDeliveriesController'

export const deliverersRoutes = Router()

deliverersRoutes.post('/', new CreateDeliverymanController().handle)
deliverersRoutes.get('/deliveries', ensureAuthenticatedDeliveryman, new ListDeliverymanDeliveriesController().handle)