import { Router } from 'express'
import { accountsRoutes } from './modules/accounts/routes/accounts.routes'
import { clientsRoutes } from './modules/clients/routes/clients.routes'
import { deliverersRoutes } from './modules/deliverers/routes/deliverers.routes'
import { deliveriesRoutes } from './modules/deliveries/routes/deliveries.routes'

export const appRoutes = Router()

appRoutes.use('/clients', clientsRoutes)
appRoutes.use('/authenticate', accountsRoutes)
appRoutes.use('/deliverers', deliverersRoutes)
appRoutes.use('/deliveries', deliveriesRoutes)