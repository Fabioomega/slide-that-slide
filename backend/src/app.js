const express = require('express');
const cors = require('cors');
const path = require('path')

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.static(path.join(__dirname, './dist/assets')))

app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Servidor de Propaganda - API',
      version: '1.0.0',
      description: 'API de autenticação e autorização do trabalho de programação web.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Desenvolvimento local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        AuthRegisterRequest: {
          type: 'object',
          required: ['username', 'senha'],
          properties: {
            username: { type: 'string', example: 'ian' },
            senha: { type: 'string', format: 'password', example: 'ian123' },
            role: {
              type: 'integer',
              description: '0 = usuário normal, 1 = admin',
              enum: [0, 1],
              example: 0
            }
          }
        },
        AuthRegisterResponse: {
          type: 'object',
          properties: {
            mensagem: {
              type: 'string',
              example: 'Usuário cadastrado com sucesso!'
            }
          }
        },
        AuthLoginRequest: {
          type: 'object',
          required: ['username', 'senha'],
          properties: {
            username: { type: 'string', example: 'ian' },
            senha: { type: 'string', format: 'password', example: 'ian123' }
          }
        },
        AuthLoginUser: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '691285aec236087e2845b0d4' },
            username: { type: 'string', example: 'ian' },
            role: { type: 'integer', enum: [0, 1], example: 0 }
          }
        },
        AuthLoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT assinado com o jwtSecret',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: { $ref: '#/components/schemas/AuthLoginUser' }
          }
        },
        ProtectedUserPayload: {
          type: 'object',
          properties: {
            sub: { type: 'string', example: '691285aec236087e2845b0d4' },
            username: { type: 'string', example: 'ian' },
            role: { type: 'integer', enum: [0, 1], example: 0 },
            iat: { type: 'integer', example: 1731297102 },
            exp: { type: 'integer', example: 1731300702 }
          }
        },
        ProtectedRouteResponse: {
          type: 'object',
          properties: {
            mensagem: { type: 'string', example: 'Acesso permitido!' },
            usuario: { $ref: '#/components/schemas/ProtectedUserPayload' }
          }
        },
        AdminDashboardResponse: {
          type: 'object',
          properties: {
            mensagem: { type: 'string', example: 'Bem-vindo, admin!' }
          }
        },
        CamposObrigatoriosError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Existem campos obrigatórios não preenchidos.'
            },
            camposObrigatorios: {
              type: 'array',
              items: { type: 'string' },
              example: ['username', 'senha']
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            mensagem: { type: 'string', example: 'Erro interno no servidor' }
          }
        }
      }
    },
    paths: {
      '/auth/register': {
        post: {
          tags: ['Autenticação'],
          summary: 'Registro de novo usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthRegisterRequest' }
              }
            }
          },
          responses: {
            '201': {
              description: 'Usuário cadastrado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthRegisterResponse' }
                }
              }
            },
            '400': {
              description: 'Campos obrigatórios não preenchidos ou usuário já existente',
              content: {
                'application/json': {
                  schema: {
                    oneOf: [
                      { $ref: '#/components/schemas/CamposObrigatoriosError' },
                      {
                        type: 'object',
                        properties: {
                          mensagem: {
                            type: 'string',
                            example: 'Usuário já cadastrado.'
                          }
                        }
                      }
                    ]
                  }
                }
              }
            },
            '500': {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Autenticação'],
          summary: 'Login do usuário',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthLoginRequest' }
              }
            }
          },
          responses: {
            '200': {
              description: 'Login efetuado com sucesso',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthLoginResponse' }
                }
              }
            },
            '400': {
              description: 'Campos obrigatórios não preenchidos',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CamposObrigatoriosError' }
                }
              }
            },
            '401': {
              description: 'Credenciais inválidas',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      mensagem: {
                        type: 'string',
                        example: 'Credenciais inválidas.'
                      }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/auth/protegida': {
        get: {
          tags: ['Autenticação'],
          summary: 'Rota protegida (teste de autenticação)',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'Acesso autorizado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ProtectedRouteResponse' }
                }
              }
            },
            '401': {
              description: 'Token ausente, inválido ou expirado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      mensagem: {
                        type: 'string',
                        example: 'Token inválido ou expirado.'
                      }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      },
      '/admin/dashboard': {
        get: {
          tags: ['Administração'],
          summary: 'Dashboard de admin',
          description: 'Acesso permitido somente para usuários com role = 1.',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'Acesso autorizado (admin)',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AdminDashboardResponse' }
                }
              }
            },
            '401': {
              description: 'Token ausente, inválido ou expirado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      mensagem: {
                        type: 'string',
                        example: 'Token inválido ou expirado.'
                      }
                    }
                  }
                }
              }
            },
            '403': {
              description: 'Usuário autenticado, mas não é admin',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      mensagem: {
                        type: 'string',
                        example: 'Acesso permitido somente para administradores.'
                      }
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
