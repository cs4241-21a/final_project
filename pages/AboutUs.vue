<template>
  <v-card>
    <div class="container" justify="center" id="app1">
      <div class="row">
        <div class="col-md-7 col-lg-6">
          <div class="about-us-content">
            <div class="heading">
              <h2>About Us</h2>
              <p class="sub-heading">Put subheadings here!</p>
            </div>
            <p>
              Team Members: <br>
              <ul id="allmembers">
                <li v-for="member in teamMembers" v-bind:key="member">
                  {{member}}
                </li>
              </ul>
            </p>
            <br>
            <v-btn @click="test" class="primary">
              Contact Us
            </v-btn>
          </div>
        </div>

        <div class="col-md-5 col-lg-6 about-img">
          <img src="/cuteDog.jpg" alt="A cute image here!">
        </div>
      </div>
    </div>
  </v-card>
  
</template>

<script>
export default {
  data() {
    return {
      teamMembers:[
        'Yang Lyu  jimmylyuyang@outlook.com',
        'Yonghua Wang',
        'Jingyu Xie',
        'Qingbei Shang',
        'Maxine Shi'
      ]
    }
  },
  methods: {
    test: function() {
      var json = {hello: "hi!"};
      var body = JSON.stringify( json );
      fetch( 'http://localhost:5000/test', {
        method:'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then( function( response) {
        console.log("I get the response!");
      })
    }
  }
}
</script>


<style>
.container {
  background-color: rgb(51, 49, 49);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
</style>

