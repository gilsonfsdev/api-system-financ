import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSignUpUseCase } from '../use-cases/factories/make-sign-up-use-case'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signupBodySchema = z.object({
    nome: z.string().min(1, 'O nome deve ser preenchido'),
    email: z.string().email().min(1, 'O e-mail deve ser preenchido'),
    senha: z.string().min(6),
  })

  const { nome, email, senha } = signupBodySchema.parse(request.body)

  try {
    const signUpUseCase = MakeSignUpUseCase()

    await signUpUseCase.execute({
      nome,
      email,
      senha,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
