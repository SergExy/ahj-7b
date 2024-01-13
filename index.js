const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');

const Tickets = require('./middlware/tickets/tickets');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true
}));

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTION') {
    next();
    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Allow-Control-Allow-Methods', 'GET, POST');
  ctx.response.status = 204;
})

app.use(Tickets.allTicket);
app.use(Tickets.createTicket);
app.use(Tickets.ticketById);
app.use(Tickets.updateById);
app.use(Tickets.deleteById);

const server = http.createServer(app.callback());
const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Server is listening to ${port}`);
});