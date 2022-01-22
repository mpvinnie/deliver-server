import { IHashProvider } from '../interfaces/IHashProvider'
import { hash, compare } from 'bcrypt'

export class BCryptHashProvider implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10)
  }

  async comparePassowrd(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }
}