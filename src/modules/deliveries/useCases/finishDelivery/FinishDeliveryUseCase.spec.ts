import { AppError } from "../../../../shared/errors/AppError"
import { DeliverersRepositoryInMemory } from "../../../deliverers/repositories/in-memory/DeliverersRepositoryInMemory"
import { DeliveriesRepositoryInMemory } from "../../repositories/in-memory/DeliveriesRepositoryInMemory"
import { FinishDeliveryUseCase } from "./FinishDeliveryUseCase"

let deliverersRepository: DeliverersRepositoryInMemory
let deliveriesRepository: DeliveriesRepositoryInMemory
let finishDelivery: FinishDeliveryUseCase

describe('FinishDelivery', () => {
  beforeEach(() => {
    deliverersRepository = new DeliverersRepositoryInMemory()
    deliveriesRepository = new DeliveriesRepositoryInMemory()
    finishDelivery = new FinishDeliveryUseCase(deliverersRepository, deliveriesRepository)
  })

  it('should be able to finish a delivery', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'deliveryman',
      password: 'password'
    })

    const delivery = await deliveriesRepository.create({
      id_client: 'client_id',
      item_name: 'item'
    })

    delivery.id_deliveryman = deliveryman.id

    await deliveriesRepository.update(delivery)

    const finishedDelivery = await finishDelivery.execute({
      accepted_delivery_id: delivery.id,
      deliveryman_id: deliveryman.id
    })

    expect(finishedDelivery.end_at).not.toBeNull()
  })

  it('should not be able to finish a delivery if deliveryman not exists', async () => {
    const delivery = await deliveriesRepository.create({
      id_client: 'client_id',
      item_name: 'item'
    })

    await expect(finishDelivery.execute({
      accepted_delivery_id: delivery.id,
      deliveryman_id: 'non-existent-deliveryman-id'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to finish a delivery if deliveryman not created it', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'deliveryman',
      password: 'password'
    })

    const delivery = await deliveriesRepository.create({
      id_client: 'client_id',
      item_name: 'item'
    })

    await expect(finishDelivery.execute({
      accepted_delivery_id: delivery.id,
      deliveryman_id: deliveryman.id
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to finish a finished delivery', async () => {
    const deliveryman = await deliverersRepository.create({
      username: 'deliveryman',
      password: 'password'
    })

    const delivery = await deliveriesRepository.create({
      id_client: 'client_id',
      item_name: 'item'
    })

    delivery.id_deliveryman = deliveryman.id

    await deliveriesRepository.update(delivery)

    await finishDelivery.execute({
      accepted_delivery_id: delivery.id,
      deliveryman_id: deliveryman.id
    })

    await expect(finishDelivery.execute({
      accepted_delivery_id: delivery.id,
      deliveryman_id: deliveryman.id
    })).rejects.toBeInstanceOf(AppError)
  })
})