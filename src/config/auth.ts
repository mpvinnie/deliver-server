export const jwt = {
  client_secret: process.env.APP_CLIENT_SECRET || 'client_secret_default',
  deliveryman_secret: process.env.APP_DELIVERYMAN_SECRET || 'deliveryman_secret_default',
  expiresIn: '1d'
}