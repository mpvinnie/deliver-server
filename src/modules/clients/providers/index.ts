import { container } from 'tsyringe'

import { BCryptHashProvider } from './hashProvider/implementations/BCryptHashProvider'
import { IHashProvider } from './hashProvider/interfaces/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)