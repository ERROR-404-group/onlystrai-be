'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);


describe ('API Server', () => {
  it('Should handle invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });

  it('Handle bad method', async () => {
    const response = await request.post('/foo');
    expect(response.status).toEqual(404); 
  });

  it('No name', async () => {
    const response = await request.get('/person').query({ name: '' });
    expect(response.status).toEqual(500);
  });

  it('Name exists', async () => {
    const response = await request.get('/person').query({ name: 'John Doe' });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('John Doe');
  });

});