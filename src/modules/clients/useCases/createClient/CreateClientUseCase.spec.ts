import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory'
import { HashProviderInMemory } from '../../providers/hashProvider/in-memory/HashProviderInMemory'
import { CreateClientUseCase } from './CreateClientUseCase'

let clientsRepository: ClientsRepositoryInMemory
let hashProvider: HashProviderInMemory
let createClient: CreateClientUseCase

describe('CreateClient', () => {
  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory()
    hashProvider = new HashProviderInMemory()

    createClient = new CreateClientUseCase(clientsRepository, hashProvider)
  })

  it('should be able to create a client', async () => {
    const client = await createClient.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(client).toHaveProperty('id')
  })

  it('should be able to create a client with a hashed password', async () => {
    const client = await createClient.execute({
      username: 'johndoe',
      password: 'password'
    })

    expect(client).toHaveProperty('id')
    expect(client.password.split(' ')[0]).toBe('hashed')
    expect(client.password.split(' ')[1]).toBe('password')
  })
})