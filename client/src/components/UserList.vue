<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <p class="headline">ホーム</p>
      <v-card>
        <v-card-title>
          <v-flex  
            class="title"
          >ユーザ一覧</v-flex>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            dark
            @click="$router.push('/user/new')"
          >新規</v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="検索"
            single-line
            hide-details>
          </v-text-field>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          no-data-text="データはありません"
          no-results-text="該当するデータが見つかりません"
          rows-per-page-text="ページあたり"
          :rows-per-page-items="rowsPerPageItems"
          :disable-initial-sort="true"
          class="elevation-1"
        >
          <template 
           slot="items" 
           slot-scope="props"
          >
            <td>
              <router-link :to="`user/${props.item._id}`">{{props.item.name}}</router-link>
            </td>
            <td>
              {{props.item.phoneNumber}}
            </td>
            <td>
              {{props.item.email}}
            </td>
          </template>
          <template 
           slot="pageText" 
           slot-scope="props"
          >
            {{props.itemsLength}} 件中 {{props.pageStart}} - {{props.pageStop}}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-snackbar
     v-model="display"
     bottom
     >{{message}}
  </v-snackbar>
  </v-layout>
</template>

<script>
import users from '../api/users'

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: '名前',
          value: 'name'
        },
        {
          text: '電話番号',
          value: 'phoneNumber'
        },
        {
          text: 'メールアドレス',
          value: 'email'
        }
      ],
      rowsPerPageItems: [
        5, 
        10, 
        25, 
        {text: 'すべて', value: -1}
      ],
      users: [],
      cursor: {
        cursor: 'pointer'
      }
    }
  },
  computed: {
    display() {
      return this.message ? true : false
    },
    message() {
      return this.$store.state.message
    }
  },
  methods: {
    async getUsers() {
      const res = await users.getUsers()
      this.users = res.data
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>

