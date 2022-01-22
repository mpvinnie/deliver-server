import { IHashProvider } from '../interfaces/IHashProvider'

export class HashProviderInMemory implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    return `hashed ${password}`
  }
}