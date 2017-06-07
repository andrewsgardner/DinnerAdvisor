// load required node modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('mongojs');
var db = mongojs('dinneradvisor',['meals']);
