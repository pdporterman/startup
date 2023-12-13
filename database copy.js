const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const scoreCollection = db.collection('scores');
// Test that you can connect to the database
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});


function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

async function getScores(){
    return scoreCollection.find({}).toArray();
}

async function updateScores(username, score) {
    let { matchedCount } = await scoreCollection.updateOne({username:username}, {
        $min:{moves:score}
    })
    if (matchedCount == 0)
        scoreCollection.insertOne({username:username, moves:score});
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getScores,
    updateScores,
};
