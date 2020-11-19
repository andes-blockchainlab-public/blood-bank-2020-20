export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'your description here',
    termsOfService: '',
    contact: {
      name: 'Tran Son hoang',
      email: 'son.hoang01@gmail.com',
      url: 'https://hoangtran.co',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/api/servicio-transfusion',
      description: 'RUTA LOCAL',
    },
  ],
  paths: {
    '/auth/create': {
      post: {
        tags: ['user'],
        summary: 'Crear un usuario',
        operationId: 'addUser',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/User',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario creado',
          },
          '422': {
            description: 'Usuario existente o parámetros inválidos',
          },
        },
      },
    },
    '/auth': {
      post: {
        tags: ['user'],
        summary: 'Login',
        description: 'Login de un usuario',
        operationId: 'login',
        produces: ['application/json'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'axficionado@hotmail.com',
                  },
                  password: {
                    type: 'string',
                    example: '1010235107',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Autenticación exitosa',
          },
          '401': {
            description: 'Email o contraseña incorrecta',
          },
        },
      },
    },
    '/hemocomponents': {
      post: {
        tags: ['hemocomponents'],
        summary: 'Crear hemocomponentes',
        description: 'Crea un hemocomponente',
        operationId: 'createHemocomponent',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Hemocomponent',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Creado con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
          '422': {
            description: 'Ya existe un hemocomponente con este id',
          },
        },
      },
      put: {
        tags: ['hemocomponents'],
        summary: 'Actualizar hemocomponente',
        description: 'Actualiza un hemocomponente',
        operationId: 'updateHemocomponent',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Hemocomponent',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Actualizado con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
          '404': {
            description: 'No se encuentra el hemocomponente con este id',
          },
        },
      },
      get: {
        tags: ['hemocomponents'],
        summary: 'Lista todos los hemocomponentes',
        description: 'Busca todos los hemocomponentes',
        operationId: 'findAllHemocomponentes',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        responses: {
          '200': {
            description: 'Operación exitosa',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Hemocomponent',
              },
            },
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/hemocomponents/{id}': {
      get: {
        tags: ['hemocomponents'],
        summary: 'Encuentra un hemocomponente por id',
        description: 'Encuentra un hemocomponente por id',
        operationId: 'findHemocomponentById',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del hemocomponente a buscar',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Operación exitosa',
            schema: {
              $ref: '#/definitions/Hemocomponent',
            },
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/hemocomponents/tests': {
      post: {
        tags: ['hemocomponents'],
        summary: 'Añade una prueba pretransfusional a un componente',
        description: 'Añade prueba pretransfusional',
        operationId: 'addTestToHemocomponent',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Test',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Test añadido con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/patients': {
      post: {
        tags: ['patients'],
        summary: 'Crear pacientes',
        description: 'Crea un paciente',
        operationId: 'createPatient',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Patient',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Creado con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
          '422': {
            description: 'Ya existe un paciente con este id',
          },
        },
      },
      put: {
        tags: ['patients'],
        summary: 'Actualizar pacientes',
        description: 'Actualiza un paciente',
        operationId: 'updatePatient',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Patient',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Actualizado con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
          '404': {
            description: 'No se encuentra el paciente con este id',
          },
        },
      },
      get: {
        tags: ['patients'],
        summary: 'Lista todos los pacientes',
        description: 'Busca todos los pacientes',
        operationId: 'findAllHPatients',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        responses: {
          '200': {
            description: 'Operación exitosa',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Patient',
              },
            },
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/patients/{id}': {
      get: {
        tags: ['patients'],
        summary: 'Encuentra un paciente por id',
        description: 'Encuentra un paciente por id',
        operationId: 'findPatientsById',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID del paciente a buscar',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Operación exitosa',
            schema: {
              $ref: '#/definitions/Patient',
            },
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/transfusions': {
      post: {
        tags: ['transfusions'],
        summary: 'Indica una transfusión de un hemocomponente a un paciente',
        description:
          'Indica una transfusión de un hemocomponente a un paciente',
        operationId: 'transfusion',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Transfusion',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Transfusión creada con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
    '/transfusions/adverse': {
      post: {
        tags: ['transfusions'],
        summary: 'Indica una reacción adversa a una transfusión',
        description: 'Indica una reacción adversa',
        operationId: 'adverseReaction',
        produces: ['application/json'],
        security: [{ Bearer: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Adverse',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Reacción adversa creada con éxito',
          },
          '401': {
            description: 'Token inválido',
          },
        },
      },
    },
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'axficionado@hotmail.com',
        },
        name: {
          type: 'string',
          example: 'Carlos Mario Sarmiento Pinilla',
        },
        role: {
          type: 'string',
          enum: ['coordinador', 'bacteriologo', 'doctor'],
          example: 'coordinador',
        },
        password: {
          type: 'string',
          example: '1010235107',
        },
      },
    },
    Hemocomponent: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '1',
        },
        bloodType: {
          type: 'string',
          example: 'O+',
        },
      },
    },
    Patient: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '1',
        },
        name: {
          type: 'string',
          example: 'Sebastián',
        },
        bloodType: {
          type: 'string',
          example: 'O+',
        },
      },
    },
    Test: {
      type: 'object',
      properties: {
        hemocomponentId: {
          type: 'string',
          example: '1',
        },
        passed: {
          type: 'boolean',
          example: true,
        },
      },
    },
    Transfusion: {
      type: 'object',
      properties: {
        hemocomponentId: {
          type: 'string',
          example: '1',
        },
        patientId: {
          type: 'string',
          example: '1',
        },
      },
    },
    Adverse: {
      type: 'object',
      properties: {
        hemocomponentId: {
          type: 'string',
          example: '1',
        },
        patientId: {
          type: 'string',
          example: '1',
        },
        symptom: {
          type: 'string',
          example: 'Mucha fiebre',
        },
      },
    },
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
}
