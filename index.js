const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js')
const app = express();

const authCookieName = 'token';
const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);
var authRouter = express.Router();
app.use(`/auth`, authRouter);

// GetAuth token for the provided credentials
authRouter.post('/login', async (req, res) => {
  let user = await DB.getUser(req.body.username);
  if (user) {
    if (!await bcrypt.compare(req.body.password, user.password)) {
      res.status(401).send({ msg: 'Unauthorized' });
      return
    }
  } else {
    user = await DB.createUser(req.body.username, req.body.password);
  }
  res.cookie(authCookieName, user.token, {
    secure: true,
    httpOnly: false,
    sameSite: 'strict',
  });
  res.send();
});

// DeleteAuth token if stored in cookie
authRouter.get('/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.redirect(307, '/');
});

secureApiRouter.use(async (req, res, next) => {
  const user = await getUser(req);
  if (user) next();
});

// GetScores from DB for user
secureApiRouter.get('/score', async (_req, res) => {
  let data = await DB.getScores();
  res.send(data);
});

// SubmitScore
secureApiRouter.post('/score', async (req) => {
  const user = await getUser(req);
  await DB.updateScores(user.username, req.body.score);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function getUser(req){
  authToken = req.cookies[authCookieName];
  return await DB.getUserByToken(authToken);
}
