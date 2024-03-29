const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const cors = require('cors')
const userController = require("./routes/api/users")
const puppyController = require("./routes/api/puppy")
const parentController = require("./routes/api/parent")
const litterController = require("./routes/api/litter")
const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Check if token and create req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use("/api/users", userController)
app.use("/api/puppies", puppyController)
app.use("/api/parents", parentController)
app.use("/api/litters", litterController)
// app.use('/api', require('./routes/api/upload'))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});