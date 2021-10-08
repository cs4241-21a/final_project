const app1 = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
            shopping: false,
            CounterPage: false,
            counter: 0,
            username : null
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        add() {
            this.counter++;
        },
        sendRequest() {
            // window.location.replace('/aboutus');
            var json = { name: "wangyonghua" },
            body = JSON.stringify( json );
            fetch( '/addData', {
                method:'POST',
                body,
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then( response => response.json() )
              .then( function( response ) {
                console.log(response.result);
              })
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
        },
        
    }
})