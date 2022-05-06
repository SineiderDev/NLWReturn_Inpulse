import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();



//rotas
//Métodos: GET, POST, PUT, DELETE, PATCH
//GET: Buscar Informações
/* routes.get('/users', (req, res) => {
  return res.send('Hello World!');
}) */
//POST: Cadastrar informações
//PUT: Atualização das Informações de uma entidade
//PATCH: Atualizar uma informação Única de uma entidade
//DELETE: Deletar Informação
routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  //retorno
  return res.status(201).send();
})