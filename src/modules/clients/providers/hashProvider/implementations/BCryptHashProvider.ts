import { IHashProvider } from '../interfaces/IHashProvider'
import { hash } from 'bcrypt'

export class BCryptHashProvider implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10)
  }

}