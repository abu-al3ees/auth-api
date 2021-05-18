/* eslint-disable no-unused-vars */
'use strict';
process.env.SECRET = 'hello';
const server = require('../src/server.js').server;

const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;
describe('Testing server', () => {
  it('should send 404 error on a bad route', async () => {
    const response = await request.get('/wrongroute');
    expect(response.status).toEqual(404);
  });
  it('should send a 404 error when no food is found', async () => {
    const response = await request.get('/error');
    expect(response.status).toEqual(404);
  });
  it('Create a Food record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.post('/api/v2/food/').set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'fish',
      calories: '20',
      type: 'PROTIEN',
    });
 
    expect(response.status).toEqual(201);
    expect(response.body.type).toEqual('PROTIEN');
    id = response.body._id;
  });
  // Update a record 
  it('Update a Food record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.put(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 'Salmofish',
      calories: '20',
      type: 'PROTIEN',
    });
   
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('PROTIEN');
  });
  // Read a record
  it('Read a Food record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Salmofish');
    expect(response.body.type).toEqual('PROTIEN');
  });
  // Read all Records
  it('Read all Food record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get('/api/v2/food/').set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Salmofish');
    expect(response.body[0].type).toEqual('PROTIEN');
  });
  // Delete a record
  it('Delete a Food record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.delete(`/api/v2/food/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
  });
  /////////////////////////////////////////////
  // clothes tests 
  it('Create a Clothes record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.post('/api/v2/clothes/').set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 't shirt',
      color: 'red',
      size: 'larg',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('t shirt');
    expect(response.body.size).toEqual('larg');
    id = response.body._id;
  });
  // Update a record 
  it('Update a Clothes record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.put(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`).send({
      name: 't shirt',
      color: 'red',
      size: 'larg',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('t shirt');
    expect(response.body.size).toEqual('larg');
  });
  // Read a record
  it('Read a Clothes record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('t shirt');
    expect(response.body.size).toEqual('larg');
  });
  // Read all Records
  it('Read all Clothes record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.get('/api/v2/clothes/').set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('t shirt');
    expect(response.body[0].size).toEqual('larg');
  });
  // Delete a record
  it('Delete a Clothes record', async () => {
    let obj = { username: 'admin', password: 'password', role: 'admin' };
    const response2 = await request.post('/signup').send(obj);
    const response1 = await request.post('/signin')
      .auth(obj.username, obj.password);
    const userObject = response1.body;
    const response = await request.delete(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${response1.body.token}`);
    expect(response.status).toEqual(200);
  });
});






