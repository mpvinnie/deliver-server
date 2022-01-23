import { container } from 'tsyringe'

import '../../modules/clients/providers'

import { ClientsRepository } from '../../modules/clients/repositories/implementations/ClientsRepository'
import { IClientsRepository } from '../../modules/clients/repositories/interfaces/IClientsRepository'

import { DeliverersRepository } from '../../modules/deliverers/repositories/implementations/DeliverersRepository'
import { IDeliverersRepository } from '../../modules/deliverers/repositories/interfaces/IDeliverersRepository'

import { DeliveriesRepository } from '../../modules/deliveries/repositories/implementations/DeliveriesRepository'
import { IDeliveriesRepository } from '../../modules/deliveries/repositories/interfaces/IDeliveriesRepository'

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository)
container.registerSingleton<IDeliverersRepository>('DeliverersRepository', DeliverersRepository)
container.registerSingleton<IDeliveriesRepository>('DeliveriesRepository', DeliveriesRepository)