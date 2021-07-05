const path = require('path');
const Koa = require('koa');
const Buffer = require('buffer');
const stream = require('stream');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();



// npm run test:local 06-koajs 01-chat-app
let clients = [];

// выводит сообщение о количестве подключенных пользователей (для отладки)
function consoleClients() {
    console.log('clients.length', clients.length);
}


router.get('/subscribe', async (ctx, next) => {
    console.log('get');

    clients.push(ctx.res);
    ctx.res.on('close', () => {
        clients.splice(clients.indexOf(ctx.res), 1);
        console.log('get closed');
        consoleClients();
    });

    consoleClients();
    return new Promise(() => {});
});

router.post('/publish', async (ctx, next) => {

    if(
        typeof(ctx.request.body.message) != "undefined"
        && ctx.request.body.message !== null
        && ctx.request.body.message !== ''
    ) {
        console.log('post, message:', ctx.request.body.message);
        for (let client of clients) {
            client.statusCode = 200;
            client.end(ctx.request.body.message);
        }
        clients = [];
    }

    ctx.res.statusCode = 200;
    ctx.res.end();
});


app.use(router.routes());

module.exports = app;
