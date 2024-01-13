const uuid = require('uuid');

let ticketsCollection = [
  {
    id: "aba123",
    created: 1705001332144,
    status: false,
    name: "Lorem text 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus veniam quos quo maiores! Dolorem aspernatur eos quia, repellat odio sit quibusdam excepturi deserunt pariatur reprehenderit doloremque, fugiat voluptate, nisi libero."
  }
];

exports.allTicket = (ctx, next) => {
  const { query } = ctx.request;
  if (query.method !== 'allTickets' || ctx.request.method !== 'GET') {
    next();
    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (!ticketsCollection.length) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'not found any ticket' };
    return;
  }

  const thinTicketsColl = ticketsCollection.map(({ description, ...ticket }) => ticket);

  ctx.response.body = JSON.stringify(thinTicketsColl);
}

exports.createTicket = (ctx, next) => {
  const { query } = ctx.request;
  if (query.method !== 'createTicket' || ctx.request.method !== 'POST') {
    next();
    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');

  const { body } = ctx.request;

  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = { error: 'wr...' };
    return;
  }

  const id = uuid.v4();
  const created = Date.now();

  const ticket = {
    ...body,
    id,
    created,
    status: false,
  };
  ticketsCollection.push(ticket);
  const { description, ...thinTicket } = ticket;

  ctx.response.body = JSON.stringify(thinTicket);
}

exports.ticketById = (ctx, next) => {
  const { query } = ctx.request;
  if (query.method !== 'ticketById' || ctx.request.method !== 'GET') {
    next();
    return;
  }

  if (!query.id) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'not found any ticket' };
    return;
  }

  const ticket = ticketsCollection.find((item) => item.id === query.id);

  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'this ticket wasn\'t creating' };
    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.body = JSON.stringify(ticket);
}

exports.updateById = (ctx, next) => {
  const { query } = ctx.request;

  if (query.method !== 'updateById' || ctx.request.method !== 'POST') {
    next();
    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');

  const { body } = ctx.request;
  
  if (!body) {
    ctx.response.status = 400;
    ctx.response.body = { error: 'wr...' };
    return;
  }

  const currentTicket = ticketsCollection.find((item) => item.id === query.id);
  if (!currentTicket) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'this ticket wasn\'t creating' };
    return;
  }

  const index = ticketsCollection.indexOf(currentTicket);
  const newTicket = {
    ...currentTicket,
    ...body,
  };
  
  ticketsCollection[index] = newTicket;
  const { description, ...thinTicket } = newTicket;

  ctx.response.body = JSON.stringify(thinTicket);
}

exports.deleteById = (ctx, next) => {
  const { query } = ctx.request;
  if (query.method !== 'deleteById' || ctx.request.method !== 'GET') {
    next();
    return;
  }

  if (!query.id) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'not found any ticket' };
    return;
  }

  const ticket = ticketsCollection.find((item) => item.id === query.id);
  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = { error: 'not found any tickets with this parameters' };
    return;
  }

  ticketsCollection = ticketsCollection.filter((ticket) => ticket.id !== query.id);

  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.status = 204;
}