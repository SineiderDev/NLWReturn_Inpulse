//Camada de Dados

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

//O que faz?
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}