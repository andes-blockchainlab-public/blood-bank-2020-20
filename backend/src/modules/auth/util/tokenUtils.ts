import IUser from './models/IUser'
import * as crypto from 'crypto'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { CustomError } from './errorHandler'

export const validateToken = async (token: string): Promise<string> => {
  if (!token) {
    throw new CustomError(
      'Debe estar autenticado para realizar esta función',
      401
    )
  }
  const user = await new Promise<string>((resolve) => {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        console.log(err)
        throw new CustomError('Token incorrecto', 401)
      } else {
        resolve(decoded)
      }
    })
  })
  return user
}

export const sign = (email: string, user: IUser): string => {
  return jwt.sign(
    {
      email,
      id: user.id,
      role: user.role,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: '12h' }
  )
}

export const createRefreshToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, function (err, buffer) {
      if (err) {
        reject(err)
      }
      const token = buffer.toString('hex')
      resolve(token)
    })
  })
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12)
}

export const verifyPassword = (
  password1: string,
  password2: string
): Promise<boolean> => {
  return bcrypt.compare(password1, password2)
}
