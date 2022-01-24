import { AppError } from '../../../../shared/errors/AppError'
import { DeliverersRepositoryInMemory } from '../../repositories/in-memory/DeliverersRepositoryInMemory'
import { ListDeliverymanDeliveriesUseCase } from './ListDeliverymanDeliveriesUseCase'

let deliverersRepository: DeliverersRepositoryInMemory
let listDeliverymanDeliveries: ListDeliverymanDeliveriesUseCase

describe('ListDeliverymanDeliveries', () => {
  beforeEach(() => {
    deliverersRepository = new DeliverersRepositoryInMemory()
    listDeliverymanDeliveries = new ListDeliverymanDeliveriesUseCase(deliverersRepository)
  })

  it('should be able to list the deliveryman deliveries', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'johndoe',
      password: 'password'
    })

    const deliverymanDeliveries = await listDeliverymanDeliveries.execute(deliveryman.id)

    expect(deliverymanDeliveries).toHaveProperty('deliveries')
    expect(deliverymanDeliveries.id).toBe(deliveryman.id)
    expect(deliverymanDeliveries.username).toBe('johndoe')
  })

  it('should not be able to list a non-existent deliveryman deliveries', async () => {
    await expect(listDeliverymanDeliveries.execute('non-existent-deliveryman-id')).rejects.toBeInstanceOf(AppError)
  })
})