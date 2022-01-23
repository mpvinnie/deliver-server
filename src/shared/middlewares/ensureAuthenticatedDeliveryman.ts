import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { jwt } from '../../config/auth'

type IPayload = {
  sub: string
}

export async function ensureAuthenticatedDeliveryman(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { deliveryman_secret } = jwt

  try {
    const { sub } = verify(token, deliveryman_secret) as IPayload

    request.id_deliveryman = sub

    return next()
  } catch (err) {
    throw new AppError('Token invalid', 401)
  }
}