import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSignInUseCase } from '../use-cases/factories/make-sign-in-use-case'
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error'

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signinBodySchema = z.object({
    email: z.string().email().min(1, 'O e-mail deve ser preenchido'),
    senha: z.string().min(6),
  })

  const { email, senha } = signinBodySchema.parse(request.body)

  try {
    const signInUseCase = MakeSignInUseCase()

    const { user } = await signInUseCase.execute({
      email,
      senha,
    })

    const token = await reply.jwtSign({
      sign: { sub: user.id },
    })

    const replyFormatted = {
      id: user.id,
      token,
    }

    return reply.status(201).send(replyFormatted)
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
