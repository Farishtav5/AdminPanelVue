<template>
  <div>
    <v-row>
      <v-col cols="auto" v-for="(item, index) in items" :key="index">
  <v-card
    max-width="374"
  >
    <v-list-item two-line>
       <v-list-item-avatar
        tile
        size="80"
        class="display-3 red--text text--lighten-1 font-weight-bold"
        
      >{{item.count > 10 ? item.count : '0'+item.count}}</v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 font-weight-medium">{{item.title}}</v-list-item-title>
        <v-list-item-subtitle class="body-1 grey--text">{{item.subtitle}}</v-list-item-subtitle>
      </v-list-item-content>

     
    </v-list-item>

  </v-card>
  </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Tile',
  computed: {
    
  },

  data: () => ({
    items: [
      {count: 15, title: 'In Queue News', subtitle: 'In queue for approval' },
      {count: 2, title: 'Published News', subtitle: 'Live for reader' },
      {count: 15, title: 'Edits Required', subtitle: 'In queue to modify content' }
      ]
  }),
};
</script>