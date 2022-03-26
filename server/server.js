/** @format */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// mongoose.connect(
// 	`mongodb+srv://<${process.env.CLUSTER_USERNAME}>:<${process.env.CLUSTER_PASSWORD}>@cluster0.kaorn.mongodb.net/Cluster0?retryWrites=true&w=majority`
// );
// mongoose.connection
// 	.on('error', (error) => console.error(error))
// 	.on('open', () => console.log('db:live'));

const uri = process.env.DB_URI;
mongoose.connect(uri);
mongoose.connection
	.on('error', (error) => console.error(error))
	.on('open', () => console.log('db connected.'));

const cookieOptions = {
	httpOnly: true,
	Expires: 1000,
};

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
	})
);
app.use(cookieParser(process.env.COOKIE_SECRET, cookieOptions));

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/project/ticket', ticketRoutes);

app.listen(port, () => console.log(`server:${port}`));
