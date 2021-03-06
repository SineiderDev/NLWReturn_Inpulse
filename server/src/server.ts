//main da aplicação
import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json({limit:'900kb'}));
app.use(express.json());
app.use(routes);





//
app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!')
});