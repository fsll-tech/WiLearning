import express from 'express';
import { getLogger } from 'log4js';
const logger = getLogger('route/user');
import { ClaUser } from '../model/model';

export const userRouter = express.Router();

userRouter.post('/login', async (req: any, res) => {
  logger.debug('login: ' + JSON.stringify(req.body));

  const { username, password } = req.body;
  let dbUser = await ClaUser.findOne({
    where: {
      username,
      password,
    }
  });
  if (!dbUser) {
    res.status(400).send({ code: 40412, message: '用户名或密码不正确' });
    return;
  }
  res.status(200).send({ user: dbUser });
});

userRouter.post('/createUser', async (req: any, res) => {
  logger.debug('createUser' + JSON.stringify(req.body));

  const { username, password, nickname } = req.body;

  let dbUser = await ClaUser.findOne({
    where: {
      username
    }
  });
  if (dbUser) {
    res.status(400).send({ message: '用户名已被使用' });
    return;
  }
  dbUser = new ClaUser();
  dbUser.password = password;
  dbUser.username = username;
  dbUser.nickname = nickname;
  await dbUser.save();
  res.status(200).end();
});
