import express from 'express';
import connectDB from './config/db.js';
import usersRoute from './routes/api/users.js';
import authRoute from './routes/api/auth.js';
import postsRoute from './routes/api/posts.js';
import profileRoute from './routes/api/profile.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.send('API is Running');
});

// Define Routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', profileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
