const express = require('express');
const supabase = require('../db/db');

const TaskRouter = express.Router;
TaskRouter.get("/", (_request, _response) => {
});

module.exports = TaskRouter;