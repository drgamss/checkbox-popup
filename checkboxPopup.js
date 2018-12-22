import Vue from 'vue';
window.Vue = Vue;
import master from './master.vue';

const bus = new Vue();
Vue.prototype.eventHub = bus;

var app = new Vue({
    el: '#app',
    components: {master}
});




