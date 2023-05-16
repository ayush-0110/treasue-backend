const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes, Model } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('express-session-sequelize')(session.Store);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
});

class User extends Model {}

User.init({
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  lastCompletedClueIndex: { type: DataTypes.INTEGER, defaultValue: 1 },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  highScore: { type: DataTypes.INTEGER, defaultValue: 0 },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  lastTime: { type: DataTypes.INTEGER, defaultValue: null },
  bestTime: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  sequelize,
  modelName: 'User',
});

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}));


app.get('/user', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }
    res.status(200).json({ lastCompletedClueIndex: user.lastCompletedClueIndex, score: user.score });
  } catch (error) {
    res.status(500).json({ message: 'Error getting user.', error });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });

  if (user) {
    req.session.userId = user.id;
    res.json({
      success: true,
      message: 'Login successful',
      user: { id: user.id, username: user.username, isAdmin: user.isAdmin },
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});


app.post('/complete-clue', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const lastCompletedClueIndex = req.body.lastCompletedClueIndex;
  const newScore = req.body.score;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }
    user.lastCompletedClueIndex = lastCompletedClueIndex;
    user.score = newScore;
    if (newScore > user.highScore) {
      user.highScore = newScore;
    }
    
    if (lastCompletedClueIndex === 1) { 
      const clueTimeTaken = req.body.lastTime; 
      user.lastTime = clueTimeTaken;
      if (user.bestTime === 0 || user.bestTime > clueTimeTaken) {
        user.bestTime = clueTimeTaken; 
      }
    }
    await user.save();
    console.log(user.lastCompletedClueIndex);
    res.status(200).json({ message: 'Clue completed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error completing clue.', error });
  }
});

app.get('/all-users', isAuthenticated, async (req, res) => {
  try {
    const users = await User.findAndCountAll({ attributes: ['username', 'lastCompletedClueIndex', 'score', 'highScore', 'lastTime', 'bestTime'] });
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


sequelize.sync();

