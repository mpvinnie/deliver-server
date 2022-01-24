import { AppError } from '../../../../shared/errors/AppError'
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory'
import { ListClientDeliveriesUseCase } from './ListClientDeliveriesUseCase'

let clientsRepository: ClientsRepositoryInMemory
let listClientDeliveries: ListClientDeliveriesUseCase

describe('ListClientDeliveries', () => {
  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory()
    listClientDeliveries = new ListClientDeliveriesUseCase(clientsRepository)
  })

  it('should be able to list a client deliveries', async () => {
    const client = await clientsRepository.create({
      username: 'johndoe',
      password: 'password'
    })

    const clientDeliveries = await listClientDeliveries.execute(client.id)

    expect(clientDeliveries).toHaveProperty('deliveries')
    expect(clientDeliveries.id).toBe(client.id)
    expect(clientDeliveries.username).toBe('johndoe')
  })

  it('should not be able to list a non-existent client deliveries', async () => {
    await expect(listClientDeliveries.execute('non-existent-client-id')).rejects.toBeInstanceOf(AppError)
  })
})