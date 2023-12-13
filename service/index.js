const cookieParser = require('cookie-parser');
const { WebSocketServer } = require('ws');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';
const port = 4000;

server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });
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


// Keep track of all the connections so we can forward messages
let connections = [];

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  const connection = { id: uuid.v4(), alive: true, ws: ws };
  connections.push(connection);
  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });
  ws.on('pong', () => {
    connection.alive = true;
  });
  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });
});

setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
        c.ws.terminate();
    } else {
        c.alive = false;
        c.ws.ping();
    }
    });
}, 10000);