<template>
  <v-layout>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-text>
          <v-text-field
            label="名前"
            v-model="user.name"
          ></v-text-field>
          <v-text-field
            label="電話番号"
            v-model="user.phoneNumber"
          ></v-text-field>
          <v-text-field
            label="メールアドレス"
            v-model="user.email"
          ></v-text-field>
          <div>作成日: {{ formatDate(user.createdAt) }}</div>
          <div>更新日: {{ formatDate(user.updatedAt) }}</div>
        </v-card-text>
        <v-card-actions>
          <template v-if="id !== 'new'">
            <v-btn 
               class="error"
               @click="deleteUser"
            >削除
            </v-btn>
            <v-btn 
             class="success"
             @click="updateUser"
            >更新
            </v-btn>
          </template>
          <v-btn v-else
           class="success"
           @click="createUser"
          >登録
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import users from '../api/users'

export default {
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      user: {
        name: '',
        phoneNumber: '',
        email: ''
      }
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = dateStr ? dateStr.substring(0, 10) : ''
      return date
    },
    deleteUser() {
      users.deleteUser(this.id)
      .then(res => {
        this.$store.dispatch('onMessage', res.data.message)
        this.$router.replace('/')
      })
      .catch(err => {
        throw err
      })
    },
    createUser() {
      console.log(this.user)
      users.createUser(this.user)
      .then(res => {
        this.$store.dispatch('onMessage', res.data.message)
        this.$router.push('/')
      })
      .catch(err => {
        throw err
      })
    },
    updateUser() {
      users.updateUser(this.user)
      .then(res => {
        this.$store.dispatch('onMessage', res.data.message)
        this.$router.push('/')
      })
      .catch(err => {
        throw err
      })
    }
  },
  async mounted() {
    if(this.id !== 'new') {
      const res = await users.getUser(this.id)
      this.user = res.data
    }
  }
}
</script>

<style>

</style>
