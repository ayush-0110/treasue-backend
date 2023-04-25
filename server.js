const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastCompletedClueIndex: { type: Number, default: 1 },
  score: { type: Number, default: 0 },
  highScore: { type: Number, default: 0 }, 
  isAdmin:{type: Boolean, default:false},
});

const User = mongoose.model('User', userSchema);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
  });
  store.on('error', function (error) {
    console.log(error);
  });
  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }));


const corsOptions = {
    origin: 'https://frontend-main.netlify.app//', // Replace this with your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/user', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }
    // console.log(user.lastCompletedClueIndex)
    res.status(200).json({ lastCompletedClueIndex: user.lastCompletedClueIndex, score: user.score });
  } catch (error) {
    res.status(500).json({ message: 'Error getting user.', error });
  }
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    let admin=false;
  if(username=="Ayush1")
  admin=true;
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        res.status(400).json({ message: 'Username already exists.' });
      } else {
        const newUser = new User({ username, password, isAdmin: admin });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.', user: { id: newUser.id, username: newUser.username } });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error registering user.', error });
    }
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
  
    if (user) {
      // Store the user ID in the session
      req.session.userId = user._id;
  
      res.json({
        success: true,
        message: 'Login successful',
        user: { id: user.id, username: user.username, isAdmin: user.isAdmin},
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
  

  app.post('/complete-clue', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    const lastCompletedClueIndex = req.body.lastCompletedClueIndex;
    const newScore = req.body.score; // Add this line
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ message: 'User not found.' });
        return;
      }
      user.lastCompletedClueIndex = lastCompletedClueIndex;
      user.score = newScore;
      if (newScore > user.highScore) {
        user.highScore = newScore;
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
      const users = await User.find().select('username lastCompletedClueIndex score highScore -_id');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users.', error });
    }
  });
  app.post('/reset', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ message: 'User not found.' });
        return;
      }
      user.lastCompletedClueIndex = 1;
      user.score = 0;
      await user.save();
      res.status(200).json({ message: 'User progress reset successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting user progress.', error });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
