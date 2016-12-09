import express from 'express';

const router = express.Router();

router.all('/*', (req, res) => {
  res.json({
    code: 404,
    message: 'Route does not exist',
  });
});

export { router as errorHandler };
