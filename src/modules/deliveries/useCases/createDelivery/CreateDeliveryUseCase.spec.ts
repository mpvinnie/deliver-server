import { AppError } from '../../../../shared/errors/AppError'
import { ClientsRepositoryInMemory } from '../../../clients/repositories/in-memory/ClientsRepositoryInMemory'
import { DeliveriesRepositoryInMemory } from '../../repositories/in-memory/DeliveriesRepositoryInMemory'
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'

let clientsRepository: ClientsRepositoryInMemory
let deliveriesRepository: DeliveriesRepositoryInMemory
let createDelivery: CreateDeliveryUseCase

describe('CreateDelivery', () => {
  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory()
    deliveriesRepository = new DeliveriesRepositoryInMemory()
    createDelivery = new CreateDeliveryUseCase(clientsRepository, deliveriesRepository)
  })

  it('should be able to create a new delivery', async () => {
    const client = await clientsRepository.create({
      username: 'johndoe',
      password: 'password'
    })

    const delivery = await createDelivery.execute({
      id_client: client.id,
      item_name: 'item'
    })

    expect(delivery).toHaveProperty('id')
    expect(delivery.id_client).toBe(client.id)
    expect(delivery.item_name).toBe('item')
  })

  it('should not be able to create a new delivery to a non-exitent client', async () => {
    await expect(createDelivery.execute({
      id_client: 'non-existent-client-id',
      item_name: 'item'
    })).rejects.toBeInstanceOf(AppError)
  })
})