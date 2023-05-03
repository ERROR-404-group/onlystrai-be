'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  
  
  try {
    if (!req.headers.authorization) { res.status(403).send('Not authorized'); } 
  
    let basic = req.headers.authorization;
    let basicString = basic.split(' ').pop();
    // console.log('basicString: ', basicString);
    let [username, pass] = base64.decode(basicString).split(':');
    // console.log('What is happening', username, pass);
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.log('FAILURE YOU DINGUS');
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};
