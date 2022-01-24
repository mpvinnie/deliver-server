import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { exclude } from "../../../../utils/exclude";
import { IClientsRepository } from "../../repositories/interfaces/IClientsRepository";

@injectable()
export class ListClientDeliveriesUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) { }

  async execute(client_id: string) {
    const client = await this.clientsRepository.findClientDeliveries(client_id)

    if (!client) {
      throw new AppError('No client found for this id', 404)
    }

    const secureClientDeliveries = exclude(client, 'password')

    return secureClientDeliveries
  }
}