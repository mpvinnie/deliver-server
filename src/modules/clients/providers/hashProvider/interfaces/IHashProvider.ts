export interface IHashProvider {
  hashPassword(password: string): Promise<string>
}