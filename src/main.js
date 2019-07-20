import Vue from 'vue';
import App from './App.vue';
import moment from 'moment'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
import axios from 'axios'

Vue.use(ElementUI);

let request = axios.create({
    baseURL: 'https://elpida-api.aimeow.com/stock/',
    timeout: 8080
});

Vue.prototype.$ajax = request;

Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).utc().format(pattern)
})

Vue.prototype.$moment = moment;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    render: h => h(App)
})
