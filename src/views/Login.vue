<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  v-model="username"
                  placeholder="Username"
                  autocomplete="username email"
                  @keyup.enter="Login()"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model="password"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  @keyup.enter="Login()"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol>
                    <CButton color="primary" class="px-4" @click="Login()">Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>

    <CModal
      title="Error"
      :show.sync="alertModal"
      color="primary"
    >
      {{ alertMessage }}
      <template #footer>
        <CButton @click="alertModal = false" color="secondary">Ok</CButton>
      </template>
    </CModal>
  </CContainer>
</template>

<script>

import store from '../store';
import axios from 'axios';
var URL_Login = store.getters.URL + '/api/UserLogin/login';

export default {
  name: 'Login',
  data() {
    return { 
      username: '',
      password: '',
      alertModal: false, 
      alertMessage: ''
    }
  },
  methods: {
    Login() {
      var modelLogin = {
        "UserName": this.username,
        "Password": this.password
      };

      //console.log("modelLogin",modelLogin);

      axios.post(URL_Login, modelLogin)
           .then(response => {

            //console.log("response",response);

            if (response.status === 200) {

               let token = {
                 token: ("Bearer " + response.data.Token), 
                 timestamp: new Date().getTime()
               }
               
               
              //localStorage.setItem('UserToken', JSON.stringify(token));
              //localStorage.setItem('username', this.username);
            
               sessionStorage.setItem('UserToken', JSON.stringify(token));
               sessionStorage.setItem('username', this.username);

                this.$router.push({ name: "Dashboard"});
          
             } else {
               this.alertMessage = response.status;
               this.alertModal = true;
             }
           })
           .catch(error => {
             console.log(error);
             this.alertMessage = error;
             this.alertModal = true;
           });
    }
  }
};

</script>
