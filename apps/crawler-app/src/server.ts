import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const PORT = Number(process.env.PORT);

const app = express();

app.get('/', (ctx) => {
  ctx.body = 'web-crawler';
});

app.use(routes);
app.listen(PORT);

console.log(`Server running on port ${PORT}`);
