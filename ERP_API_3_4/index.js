const express = require('express');
const path = require('path');
const cors = require('cors');

const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: '*', // cho phép tất cả frontend gọi đến
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

//Route
const api = require('./src/route/index');

api(app);

app.listen(port, () => {});
