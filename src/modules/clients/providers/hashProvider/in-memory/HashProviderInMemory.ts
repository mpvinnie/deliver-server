import { IHashProvider } from '../interfaces/IHashProvider'

export class HashProviderInMemory implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    return `hashed ${password}`
  }

  async comparePassowrd(password: string, hashedPassword: string): Promise<boolean> {
    return hashedPassword === `hashed ${password}`
  }
}