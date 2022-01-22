import { container } from 'tsyringe'

import '../../modules/clients/providers'

import { ClientsRepository } from '../../modules/clients/repositories/implementations/ClientsRepository'
import { IClientsRepository } from '../../modules/clients/repositories/interfaces/IClientsRepository'

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository)