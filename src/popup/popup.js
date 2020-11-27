import Vue from 'vue';
import { Row, Col, Switch, Divider } from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Switch.name, Switch);
Vue.component(Divider.name, Divider);

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render: h => h((window.app = App)),
});
