/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const webpackConfig = require('@vue/cli-service/webpack.config');
const { createBundleRenderer } = require('vue-server-renderer');
const send = require('koa-send');
const Router = require('koa-router');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const MemoryFS = require('memory-fs');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

/* 模拟window对象逻辑 */
const resourceLoader = new jsdom.ResourceLoader({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
});// 设置UA
const dom = new JSDOM('', {
  url: 'https://app.nihaoshijie.com.cn/index.html',
  resources: resourceLoader,
});

global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;
window.nodeis = true; // 给window标识出node环境的标志位
const dll = require('../public/js/runtime/runtime.umd.prod.js');

// window.runtime_major_4 = dll;
// console.log(window.runtime_major_4);

/* 模拟window对象逻辑 */

const serverCompiler = webpack(webpackConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(error => console.error(error));
  stats.warnings.forEach(warn => console.warn(warn));
  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json',
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.log('new bundle generated');
});

function renderToString(context, renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

const router = new Router();

router.get('*', async (ctx, next) => {
  if (!bundle) {
    ctx.body = '等待webpack打包完成后在访问在访问';
    return;
  }
  const url = ctx.path;
  console.log(ctx.url);
  if (url.includes('favicon.ico')) {
    return await send(ctx, url, { root: path.resolve(__dirname, '../public') });
  } else if (url.startsWith('/api')) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        target: 'http://localhost:7001',
        changeOrigin: true,
        secure: false,
      }),
    )(ctx, next);
    return await next();
    // return await send(ctx, url);
  } else {
    const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
    const clientManifest = clientManifestResp.data;

    const renderer = createBundleRenderer(bundle, {
      runInNewContext: false,
      template: fs.readFileSync(
        path.resolve(__dirname, '../public/index.temp.html'),
        'utf-8',
      ),
      clientManifest,
      inject: false,
    });
    try {
      const html = await renderToString(ctx, renderer);
      ctx.body = minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
    } catch (e) {
      console.log(e);
      ctx.body = e;
    }
  }
});
router.post('*', async (ctx, next) => {
  const url = ctx.path;
  console.log(ctx.url);
  if (url.startsWith('/api')) {
    ctx.respond = false;
    await k2c(
      createProxyMiddleware({
        target: 'http://localhost:7001',
        changeOrigin: true,
        secure: false,
      }),
    )(ctx, next);
    return await next();
    // return await send(ctx, url);
  }
});

module.exports = router;
