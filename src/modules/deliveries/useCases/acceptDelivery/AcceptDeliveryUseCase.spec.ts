import { AppError } from '../../../../shared/errors/AppError'
import { DeliverersRepositoryInMemory } from '../../../deliverers/repositories/in-memory/DeliverersRepositoryInMemory'
import { DeliveriesRepositoryInMemory } from '../../repositories/in-memory/DeliveriesRepositoryInMemory'
import { AcceptDeliveryUseCase } from './AcceptDeliveryUseCase'

let deliverersRepository: DeliverersRepositoryInMemory
let deliveriesRepository: DeliveriesRepositoryInMemory
let acceptDelivery: AcceptDeliveryUseCase

describe('AcceptDelivery', () => {
  beforeEach(() => {
    deliverersRepository = new DeliverersRepositoryInMemory()
    deliveriesRepository = new DeliveriesRepositoryInMemory()
    acceptDelivery = new AcceptDeliveryUseCase(deliverersRepository, deliveriesRepository)
  })

  it('should be able to accept a delivery', async () => {
    const delivery = await deliveriesRepository.create({
      id_client: 'id_client',
      item_name: 'item'
    })

    const deliveryman = await deliverersRepository.create({
      username: 'johndoe',
      password: 'password'
    })

    const acceptedDelivery = await acceptDelivery.execute({
      deliveryman_id: deliveryman.id,
      delivery_id: delivery.id
    })

    expect(acceptedDelivery.id_deliveryman).toBe(deliveryman.id)
  })

  it('should not be able to accept a delivery if deliveryman not exists', async () => {
    const delivery = await deliveriesRepository.create({
      id_client: 'id_client',
      item_name: 'item'
    })

    await expect(acceptDelivery.execute({
      deliveryman_id: 'non-existent-deliveryman-id',
      delivery_id: delivery.id
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to accept a non-existent delivery', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'johndoe',
      password: 'password'
    })

    await expect(acceptDelivery.execute({
      deliveryman_id: deliveryman.id,
      delivery_id: 'non-existent-delivery-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})