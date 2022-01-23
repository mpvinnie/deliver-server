import { DeliveriesRepositoryInMemory } from '../../repositories/in-memory/DeliveriesRepositoryInMemory'
import { FindAvailableDeliveriesUseCase } from './FindAvailableDeliveriesUseCase'

let deliveriesRepository: DeliveriesRepositoryInMemory
let findAvailableDeliveries: FindAvailableDeliveriesUseCase

describe('FindAvailableDeliveries', () => {
  beforeEach(() => {
    deliveriesRepository = new DeliveriesRepositoryInMemory()
    findAvailableDeliveries = new FindAvailableDeliveriesUseCase(deliveriesRepository)
  })

  it('should be able to list all available deliveries', async () => {
    const delivery1 = await deliveriesRepository.create({
      id_client: 'id_client1',
      item_name: 'item1',
    })

    const delivery2 = await deliveriesRepository.create({
      id_client: 'id_client1',
      item_name: 'item2'
    })

    const availableDeliveries = await findAvailableDeliveries.execute()

    expect(availableDeliveries[0]).toBe(delivery1)
    expect(availableDeliveries[1]).toBe(delivery2)
  })
})