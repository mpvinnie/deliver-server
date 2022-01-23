import { Router } from 'express'

import { CreateDeliverymanController } from '../useCases/createDeliveryman/CreateDeliverymanController'

export const deliverersRoutes = Router()

deliverersRoutes.post('/', new CreateDeliverymanController().handle)