// LOAD REQUIRED NODE MODULES
// ==========================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('mongojs');
var db = mongojs('dinneradvisor',['meals']);

// MIDDLEWARE
// ==========
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
