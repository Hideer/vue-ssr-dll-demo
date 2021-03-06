/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
// import dll from '../public/js/runtime/runtime.umd.prod.js';
// import 'vue-burger-button/dist/vue-burger-button.css';
// import YBottom from 'vue-burger-button';
import './pageModules/YBottom/index.css';
import YBottom from './pageModules/YBottom/index.js';
import './pageModules/SingleBanner/index.css';
import YBanner from './pageModules/SingleBanner/index.js';

import App from './App.vue';
import { createRouter } from './router.index';
import { createStore } from './store.index';
import './utils/filter_time';

Vue.config.productionTip = false;

export function createApp(): any {
  // if(window === undefined){
  //   global.window ;
  // }
  console.log('我是一个文件小小', window);

  Vue.component('y-bottom', YBottom);
  Vue.component('y-banner', YBanner);

  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
    mounted() {
      this.consoleVersion('构建版本', process.env.CODE_VERSION);
      this.consoleVersion('功能分支', process.env.CODE_BRANCH, '#c23531');
      this.consoleVersion('更新用户', process.env.COMMER_USER, '#c23531');
      this.consoleVersion('更新信息', process.env.COMMER_MESSAGE, '#c23531');
      this.consoleVersion('更新时间', process.env.COMMER_TIME, '#c23531');
    },
    methods: {
      consoleVersion(label = '', value = '', labelColor = '#35495e', valueColor = '#41b883') {
        console.log(
          `%c ${label} %c ${value} %c`,
          `background:${labelColor} ; padding: 1px; border-radius: 3px 0 0 3px; color: #fff`,
          `background:${valueColor} ; padding: 1px; border-radius: 0 3px 3px 0; color: #fff`,
          'background:transparent;',
        );
      },
    },
  });
  return { app, router, store };
}
