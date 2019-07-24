<template>
  <v-app>
    <v-container fluid>
      <v-layout 
       row 
       wrap
       justify-center 
       align-center
       text-uppercase
       fill-height
      >
        <v-flex 
         xs12
         sm6
         text-xs-center
        >
          <p class="display-3 ma-5">404 not found</p>
          <v-btn 
           color="primary"
           v-on:click="goTo(page.home)"
          >
            ホーム
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      page: {
        home: '/'
      }
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>
