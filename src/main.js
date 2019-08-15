import Vue from 'vue';
import App from './App.vue';
import moment from 'moment'
import './plugins/element.js'


import router from './router'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css';

let request = axios.create({
    baseURL: 'http://localhost:8080/stock/',
    // baseURL: 'https://elpida-api.aimeow.com/stock/',
    timeout: 99999
});

Vue.prototype.$ajax = request;

Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

Vue.prototype.$moment = moment;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    render: h => h(App)
})
