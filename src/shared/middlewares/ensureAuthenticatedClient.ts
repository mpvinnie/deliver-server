import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { jwt } from '../../config/auth'

type IPayload = {
  sub: string
}

export async function ensureAuthenticatedClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { client_secret } = jwt

  try {
    const { sub: id_client } = verify(token, client_secret) as IPayload

    request.client.id = id_client

    return next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}