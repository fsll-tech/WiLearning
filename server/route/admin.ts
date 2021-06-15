import express from 'express';
import { getLogger } from 'log4js';
const logger = getLogger('route/admin');

export const adminRouter = express.Router();

const MOCK_ADMIN_USERS = [
  { username: 'admin01', password: '123456' },
  { username: 'admin02', password: '654321' },
  { username: 'admin03', password: '111111' },
  { username: 'admin04', password: '222222' },
];

adminRouter.post('/login', async (req, res) => {
  logger.debug('adminLogin: ' + JSON.stringify(req.body));

  const { username, password } = req.body;

  for (let i = 0; i < MOCK_ADMIN_USERS.length; i++) {
    if (MOCK_ADMIN_USERS[i].username === username && MOCK_ADMIN_USERS[i].password === password) {
      res.status(200).send({ result: 'OK' });
      return;
    }
  }
  res.status(400).send('The user name or password is incorrect');
});
