import { body, ValidationChain, validationResult } from 'express-validator'
import express from 'express'
import { Middleware } from 'express-validator/src/base'
export const validate = (
  method: 'create' | 'update'
): Array<ValidationChain | Middleware> => {
  switch (method) {
    case 'create': {
      return [
        body('id', 'Debe ingresar un id válido').exists(),
        body('name', 'Debe ingresar un nombre del paciente válido').exists(),
      ]
    }
    case 'update': {
      return [
        body('id', 'Debe ingresar un id válido').exists(),
        body('name', 'Debe ingresar un nombre del paciente válido').exists(),
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
  try {
    const headers = new Headers()
    headers.set('Authorization', req.headers['authorization'] as string)

    const response = await fetch(
      `${process.env.BACK_URL!}servicio-transfusion/auth/user`,
      {
        method: 'POST',
        headers,
      }
    )
    if (!response.ok) {
      res.status(401).json(await response.json())
      return
    }
    req.user = await response.json()
    next()
  } catch (err) {
    next({ message: 'Token inválido', statusCode: 401 })
  }
}
