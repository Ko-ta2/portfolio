<template>
<v-app>
  <v-content>
  <div class="logIn-box">
    <v-img
     src="../images/view.jpg"
     gradient="0deg, #ffffff, transparent"
     height="100vh"></v-img>
    <v-layout
     row
     align-center
     justify-center
     fill-height
     class="fixed"
    >
      <v-flex xs11 sm4>
        <v-card class="elevation-10 pa-4">
          <p class="display-1 text-xs-center my-5">Wisteria</p>
          <v-form
           ref="form"
           v-model="valid"
          >
            <v-text-field
             v-model="email"
             label="メールアドレス"
             v-bind:rules="emailRules"
             required
            ></v-text-field>
            <v-text-field
             v-model="password"
             label="パスワード"
             v-bind:rules="passwordRules"
             type="password"
             required
            ></v-text-field>
          </v-form>
          <v-btn 
           block 
           round
           color="primary"
           v-on:click="logIn"
          >ログイン
          </v-btn>
          <p class="body-2 pt-3 text-xs-center">または</p>
          <v-btn 
           block 
           round 
           color="secondary"
           v-on:click="signUp"
          >新規登録
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
     v-model="snackbar"
     bottom
     color="error"
     v-bind:timeout="3000"
    >{{message}}</v-snackbar>
  </div>
  </v-content>
</v-app>
</template>

<script>
import users from '../api/users'
import bcrypt from 'bcryptjs'

export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      message: '',
      hashRounds: 10,
      valid: true,
      emailRules: [
        val => !!val || 'メールアドレスは必須です。',
        val => /.+@.+/.test(val) || '有効なメールアドレスが必要です。'
      ],
      passwordRules: [
        val => !!val || 'パスワードは必須です。'
      ]
    }
  },
  methods: {
    logIn() {
      if(this.$refs.form.validate()) {
      users.checkUser({email: this.email})
      .then((res) => {
        if(!res.data) {
          this.snackbar = true,
          this.message = 'メールアドレスが不正です。'
        } else {
          bcrypt.compare(this.password, res.data.password)
          .then((matched) => {
            if(matched) {
              localStorage.setItem('email', this.email)
              localStorage.setItem('password', this.password)
              this.$store.dispatch('setUserId', res.data._id)
              const path = this.$route.query.redirect || '/'
              this.$router.push(path)
            } else {
              this.snackbar = true
              this.message = 'パスワードが不正です。'
            }
          })
          .catch((err) => {
            throw err
          })
        }
      })
      .catch((err) => {
        throw err
      })
      }
    },
    signUp() {
      if(this.$refs.form.validate()) {
      users.checkUser(this.email)
      .then((res) => {
        if(res.data) {
          this.snackbar = true
          this.message = 'このメールアドレスは既に使用されています。'
        } else {
          bcrypt.hash(this.password, this.hashRounds)
          .then((hash) => {
            const newUser = {
              email: this.email,
              password: hash
            }

            users.signUp(newUser)
            .then((res) => {
              if(res.data.success) {
                localStorage.setItem('email', this.email)
                localStorage.setItem('password', this.password)
                this.$store.dispatch('setUserId', res.data.userId)
                const path = this.$route.query.redirect || '/'
                this.$router.push(path)
              } else {
                this.snackbar = true
                this.message = res.data.message
              }
            })
            .catch((err) => {
              throw err
            })
          })
          .catch((err) => {
            throw err
          })
        }
      })
      .catch((err) => {
        throw err
      })
    }
    }
  },
  mounted() {
    if(localStorage.getItem('email')) {
      this.email = localStorage.getItem('email')
    }
    if(localStorage.getItem('password')) {
      this.password = localStorage.getItem('password')
    }
  }
}
</script>

<style scoped>
.logIn-box {
  height: 100vh;
}

.fixed {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>


