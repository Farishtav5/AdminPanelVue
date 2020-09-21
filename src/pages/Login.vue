<template>
<v-container style= "background: #F2F2F2 0% 0% no-repeat padding-box;" fill-height fluid>
  <v-row class="pa=0 ma-0" align="center"
      justify="center">
      <v-col class="text-center pa-0 ma-0" cols="6">
        <v-card
        class=" mx-auto pa-11"
        max-width="529"
        max-height="549"
  >
    <v-img
      contain
      class="white--text mx-auto"
      height="30px"
      width="228"
      src="./../assets/images/Layer 2.png"
    >
    </v-img>

    <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle> -->

    <v-card-text class="text--primary mt-8">
      <p class="text-left mb-0">Username or Email Address</p>
      <v-text-field
        v-model="email"
        dense
        outlined
        single-line
        placeholder="Type email"
        color="grey"
      ></v-text-field>

      <div class="login">
      <p class="text-left mb-0">Password</p>
      <v-text-field
        v-model="pwd"
        dense
        outlined
        single-line
        placeholder="Type password"
        color="grey"
      ></v-text-field>
      </div>
      
      <div class="d-flex justify-space-between mt-0">
        <div>
          <span @click="saveCreds" v-show="!rememberMe">
            <v-icon color="grey darken-2" small>
              mdi-circle-outline
            </v-icon>
          </span>
          <span @click="saveCreds" v-show="rememberMe">
            <v-icon color="green darken-2" small>
              mdi-check-circle
            </v-icon>
          </span>
          Remember Me
        </div>
        <div class="red--text">Forgot password?</div>
      </div>
    </v-card-text>

    <v-card-actions class="mx-2">
      <v-btn @click="submitHandler()" rounded color="black" class="px-3 text-capitalize" dark>Sign In</v-btn>
    </v-card-actions>
  </v-card>

      </v-col>
  </v-row>
</v-container>
</template>


<script>
import login from '@/services/login';

export default {
  name: 'Login',
  data: () => ({
    rememberMe: false,
    email: 'satish@bluone.in',
    pwd: '123456'
  }),
  methods: {
    saveCreds() {
      this.rememberMe = !this.rememberMe
    },
    async submitHandler() {
      console.log("called")
      let data = {
        email: this.email,
        password: this.pwd,
        type: "web"
      }
      console.log("data", data)
      try {
        const response = await login.userLogin(data);
        console.log(response.data.token)
        localStorage.setItem('access_token', response.data.token)
        this.$router.push({path: '/dashboard'})
      } catch (error) {
          // handle the error here
      } 
    }
  }
};
</script>

<style>
.login .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0 !important ;
}
</style>
