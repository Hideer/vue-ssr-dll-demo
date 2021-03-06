/* eslint-disable @typescript-eslint/no-var-requires */
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');
const path = require('path');
// const dll = require('../public/js/runtime/runtime.umd.prod.js');

console.log('我在node环境');

const resolve = file => path.resolve(__dirname, file);
const app = new Koa();

const router = require('./server');

app.use(router.routes()).use(router.allowedMethods());
// 开放目录
app.use(koaMount('/dist', koaStatic(resolve('../dist'))));
app.use(koaMount('/public', koaStatic(resolve('../public'))));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started at https://localhost:${port}`);
});
