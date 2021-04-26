import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
