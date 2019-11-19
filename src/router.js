import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../src/components/HelloWorld.vue'
import HelloKedua from '../src/components/HelloKedua.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HelloWorld
        },
        {
            path: '/HelloKedua',
            name: 'kedua',
            component: HelloKedua
        },
    ]
})

