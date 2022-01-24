import { Router } from 'express'
import { ensureAuthenticatedClient } from '../../../shared/middlewares/ensureAuthenticatedClient'
import { CreateClientController } from '../useCases/createClient/CreateClientController'
import { ListClientDeliveriesController } from '../useCases/listClientDeliveries/ListClientDeliveriesController'

export const clientsRoutes = Router()

clientsRoutes.post('/', new CreateClientController().handle)
clientsRoutes.get('/deliveries', ensureAuthenticatedClient, new ListClientDeliveriesController().handle)