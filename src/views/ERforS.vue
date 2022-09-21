<template>
  <v-app>
    <v-app-bar color="black" app elevation="8"  rounded-0 height="100" >
      <v-toolbar-title >     
        <v-btn dark rounded>Home</v-btn>
      <v-btn dark  rounded>Login </v-btn>
      <v-btn dark  rounded> About</v-btn>  
      </v-toolbar-title>
     
      <v-spacer></v-spacer>
      
  </v-app-bar >
  
  <v-main >
    <v-row>
      <v-col
        class="text-center"
        cols="16">
        <center>
        <!--<div class="maregenes"><v-img src="../assets/images/logo-inverse.png"></v-img></div> -->
      </center>
        
      <v-alert
      
      v-if= "error"
      prominent
      :type= "typeError"
      width="500" 
      class="mx-auto mt-1"
      
    >
      <v-row align ="center"  @click:append= "error = ! error" >
        <v-col class="grow">
          {{error_msg}}
        </v-col>
        <v-col class="shrink">
          <v-btn  @click = "error = ! error, usuario='', password=''">Reintentar!</v-btn>
        </v-col>
      </v-row>
    </v-alert>
   
        <div >
          <v-card   width="300" height="400" class="mx-auto mt-auto" elevation="24">
      <v-card-title > LOGIN </v-card-title>
      <v-card-text >
        <form v-on:submit.prevent="login">
        <v-text-field 
          label="Username" 
          prepend-icon="mdi-account-circle" 
          v-model="usuario"/>

        <v-text-field 
          label="Password" 
          :type= "MostrarContraseña ? 'text' : 'Password'" 
          prepend-icon="mdi-lock" 
          :append-icon="MostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="MostrarContraseña = ! MostrarContraseña"
          v-model= "password"
        />
        <div>
        <v-btn color="success" type="submit" value="login">Login</v-btn>
        <v-col></v-col>
        <v-btn color="info" left= "true" >Register</v-btn>
      </div>
      </form>
      </v-card-text>
    </v-card>
    </div>
  <p></p>
      <v-col cols="6">
   <v-text-field
              
              value="Marcos Atencia, Lez Gonzalez, Heydi Estrada, Lina Lopez, Carolina Ramir, Cristian Causil"
              color="purple"
              solo
              background-color="blue"
              readonly
            ></v-text-field>
          </v-col>
      </v-col>

    </v-row>
  </v-main>
</v-app>

</template>


<script>
/*import ERforS from '@/components/ERforS.vue'*/
import axios from 'axios'
export default {
  name: 'App',
  /*components: {
    ERforS
  },*/
   data () {
    return  {
      MostrarContraseña: false,
      usuario: "",
      password: "",
      error: false,
      error_msg:"",
      typeError:"",
  }},
  methods:{
    login(){
           let json = {
        "nickname" : this.usuario,
        "password" : this.password
      };
      

      axios.post('https://marcosrepositorio.herokuapp.com/auth', json)
      .then( response =>{
         console.log(response.data)
        if(response.status == 500){
            console.log("error conexion")
             //localStorage._id = data.data.result._id;
             //this.$router.push('dashboard');
        }
          else{ 
            if(response.data == "No digito ningun campo"){
            this.error = true;
              this.error_msg = "Por favor digite los campos";
              this.typeError = "info";
          } 
          else if(response.data == "No ingreso Usuario"){
              this.error = true;
              this.error_msg = "Por favor ingrese un Usuario";
              this.typeError = "error";
          }
          else if(response.data == "No ingreso contraseña"){
            this.error = true;
            this.error_msg = "Por favor ingrese una contraseña";
            this.typeError = "error";
          }
          else if( response.data == "Usuario invalido" || response.data == "No existe el usuario"){
              this.error = true;
              this.error_msg = "Usuario o contraseña invalido";
              this.typeError = "warning";
            }
            else{
              this.error = true;
              this.error_msg = "Success";
              this.typeError = "success";
              console.log(response.data, "Todo correcto");
          this.$router.push('about');
            }
          }
      })
    }

  },
  mounted() {
   /* this.axios.get('https://marcosrepositorio.herokuapp.com/peoples')
    .then((response) => {
       console.log(response.data)
        this.items = response.data;
      })*/
  },


};
</script>
<style scoped>
   .maregenes{
    margin-top:-6.2%;
    margin-bottom: 4%;
    width: 400px;
    height: 100px;
    
   

  }
  main{
    background-image: url("https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg");
    background-size: cover;
  }
  .v-application .rounded-bl-xl {
      border-bottom-left-radius: 300px !important;
  }
  .v-application .rounded-br-xl {
      border-bottom-right-radius: 300px !important;
  }
  </style>