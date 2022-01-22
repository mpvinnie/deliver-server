import { Router } from 'express'
import { accountsRoutes } from './modules/accounts/routes/accounts.routes'
import { clientsRoutes } from './modules/clients/routes/clients.routes'

export const appRoutes = Router()

appRoutes.use('/clients', clientsRoutes)
appRoutes.use('/authenticate', accountsRoutes)