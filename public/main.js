const app1 = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})

// this app2 is a new Vue used to control <div id="app2"> in html
const app2 = Vue.createApp({
    data: () => ({
        counter: 0
    }),
    methods: {
        add() {
            this.counter++;
        }
    }

})
