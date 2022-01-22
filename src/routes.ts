import { Router } from 'express'
import { clientsRoutes } from './modules/clients/routes/clients.routes'

export const appRoutes = Router()

appRoutes.use('/clients', clientsRoutes)