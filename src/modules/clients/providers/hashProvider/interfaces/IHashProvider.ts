export interface IHashProvider {
  hashPassword(password: string): Promise<string>
  comparePassowrd(password: string, hashedPassword: string): Promise<boolean>
}