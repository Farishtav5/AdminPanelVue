<template>
  <v-app>
    <component :is="layout"> </component>
    <v-main>
      <NewsDrawer />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NewsDrawer from "@/components/NewsDrawer"
const default_layout = "default"

export default {
  name: 'App',
  components:{
    NewsDrawer
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  },

  data: () => ({
    //
  }),
};
</script>