import { body, ValidationChain, validationResult } from 'express-validator'
import express from 'express'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'create'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'create': {
      return [
        body('id', 'Debe ingresar un id válido').exists(),
        body('name', 'Debe ingresar un nombre de hospital válido').exists(),
      ]
    }
  }
}

export const validationErrorHandler = (req): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw {
      message: 'Error de validación',
      statusCode: '400',
      data: errors.array(),
    }
  }
}

export const verifyUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const headers = new Headers()
  headers.set('Authorization', req.headers['authorization'] as string)

  const response = await fetch(`${process.env.BACK_URL!}auth/user`, {
    method: 'POST',
    headers,
  })
  if (!response.ok) {
    res.status(401).json(await response.json())
    return
  }
  req.user = await response.json()
  next()
}
