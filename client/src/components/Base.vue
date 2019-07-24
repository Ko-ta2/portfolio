<template>
  <v-app>
    <v-navigation-drawer 
      v-model="navigationDrawer" 
      absolute
      temporary
    >
      <v-list class="pa-0 ">
        <v-list-tile class="primary">
          <v-list-tile-content>
            <v-list-tile-title class="title white--text">
              サンプル
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              ホーム
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      app 
      dense 
      dark 
      color="primary"
    >
      <v-toolbar-side-icon v-on:click="navigationDrawer = !navigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="div" class="cursor">サンプル</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-menu bottom left>
        <template #activator="{ on }">
          <v-btn 
           dark
           icon
           v-on="on"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>
              ログアウト
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> -->
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navigationDrawer: false
    }
  }//,
  // methods: {
  //   logout() {
  //     this.$store.dispatch('clearUserId')
  //     this.$router.push('/login')
  //   }
  // }
}
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>