<template>
    <div v-if="!loading" class="mt-6">
      <v-data-table
        :items="news"
        class="elevation-2 news-table"
        :headers="headers"
        hide-default-footer
      >

      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th :colspan="headers.length">
              <div class="d-flex justify-space-between"> 
                <h2 class="subtitlde-1 black--text mt-1 "> List of News  </h2>
                <span class="text-center">
                  <v-menu 
                    offset-y
                    :close-on-content-click="false"
                    close-on-click
                    class="customize"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        class="text-btn body-1 pa-0 text-decoration-underline font-italic text-capitalize"
                      >
                        Customize
                      </v-btn>
                    </template>
                    <v-list class="customize">
                      <v-list-item
                        v-for="(item, index) in totalHeaders"
                        :key="index"
                        @click="updateHeader(item)"
                      >
                        <v-list-item-title>
                          <span class="mr-1">
                            <v-icon v-show="checkHeader(item.value) < 0" color="grey darken-2" small>
                              mdi-circle-outline
                            </v-icon>
                            <v-icon v-show="checkHeader(item.value) >= 0" color="green darken-2" small>
                              mdi-check-circle
                            </v-icon>
                          </span>
                          {{ item.text }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.news`]="{item}">
          <div class="mt-3" v-if="item.id <= 0">
            <v-text-field
                v-if="item.id < 0"
                class="news"
                dense
                outlined
                placeholder='Search'
            ></v-text-field>
            <v-text-field
                v-if="item.id === 0"
                class="news"
                dense
                outlined
                placeholder='Add Headline'
                v-model="title"
            ></v-text-field>
          </div>
          <div v-else class="body-1">{{item.headline}}
          </div>
      </template>

      <template v-slot:[`item.group`]="{item}">
          <div class="mt-3" v-if="item.id <= 0 ">
          <v-text-field
                class="news"
                v-if="item.id < 0"
                dense
                outlined
                placeholder="Search"
            ></v-text-field>
            <v-autocomplete
              v-if="item.id === 0"
              v-model="selGroups"
              :items="allGroups"
              item-value="id"
              item-text="name"
              outlined
              dense
              chips
              small-chips
              multiple
              class="body-1 pt-2 news-selector"
              placeholder="Select"
          >
            <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  small
                  @click="data.select"
                  @click:close="removeGroup(data.item)"
                  class="ma-1 grey--text text--darken-3"
                  color="yellow lighten-4"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
          </v-autocomplete>
            
          </div>
          <div v-else class="body-1">
            <div v-for="(val,index) in item.categories" :key="index">{{val.name}}</div>
          </div>
      </template>

      <template v-slot:[`item.url`]="{item}">
          <div class="mt-3" v-if="item.id <= 0">
          <v-text-field
                v-if="item.id < 0"
                class="news"
                dense
                outlined
                placeholder="Search"
            ></v-text-field>
            <v-text-field
                v-if="item.id === 0"
                class="news"
                dense
                outlined
                placeholder="Paste your Link"
                v-model="link"
            ></v-text-field>
          </div>
          <div v-else class="body-1">{{item.link}}</div>
      </template>
      <template v-slot:[`item.link`]="{item}">
          <div class="mt-3 d-flex justify-space-between" v-if="item.id <= 0">
          <v-text-field
                class="news mr-1"
                v-if="item.id < 0"
                placeholder="From"
                dense
                outlined
            ></v-text-field>
            <v-text-field
                class="news"
                placeholder="To"
                v-if="item.id < 0"
                dense
                outlined
            ></v-text-field>
          </div>
          <div v-else class="body-1">
            <span>{{moment(new Date(item.createdAt)).format('LLL')}}</span>
          </div>
      </template>

      <template v-if="checkHeader('assigned') >= 0" v-slot:[`item.assigned`]="{item}">
          <div class="mt-3 d-flex justify-space-between" v-if="item.id <= 0">
          <v-text-field
                class="news mr-1"
                v-if="item.id < 0"
                placeholder="From"
                dense
                outlined
            ></v-text-field>
            <v-text-field
                class="news"
                placeholder="To"
                v-if="item.id < 0"
                dense
                outlined
            ></v-text-field>
          </div>
          <div v-else class="body-1">{{item.updatedAt}}</div>
      </template>

      <template v-if="checkHeader('published') >= 0" v-slot:[`item.published`]="{item}">
          <div class="mt-3 d-flex justify-space-between" v-if="item.id <= 0">
          <v-text-field
                class="news mr-1"
                v-if="item.id < 0"
                placeholder="From"
                dense
                outlined
            ></v-text-field>
            <v-text-field
                class="news"
                placeholder="To"
                v-if="item.id < 0"
                dense
                outlined
            ></v-text-field>
          </div>
          <div v-else class="body-1">{{item.publishedAt}}</div>
      </template>

      <template v-if="checkHeader('scheduled') >= 0" v-slot:[`item.scheduled`]="{item}">
          <div class="mt-3 d-flex justify-space-between" v-if="item.id <= 0">
          <v-text-field
                class="news mr-1"
                v-if="item.id < 0"
                placeholder="From"
                dense
                outlined
            ></v-text-field>
            <v-text-field
                class="news"
                placeholder="To"
                v-if="item.id < 0"
                dense
                outlined
            ></v-text-field>
          </div>
          <div v-else class="body-1">{{item.scheduledTo}}</div>
      </template>

      <template v-slot:[`item.status`]="{item}">
          <div class="mt-3" v-if="item.id <= 0">
          <v-autocomplete
              class="news"
              dense
              v-if="item.id < 0"
              :items="status"
              placeholder="Filter"
              outlined
            ></v-autocomplete>
          </div>
          <div v-else :class="getTextColor(item.status)" class="body-1">{{item.status ? item.status : 'In Queue'}}</div>
      </template>

      <template v-slot:[`item.actions`]="{item}">
          <div class="text-right" v-if="item.id <= 0">
            <v-btn @click="addNews()" v-if="item.id === 0" outlined rounded  class="px-3 body-1 text-capitalize">Submit</v-btn>
          </div>
          <div v-else class="text-right">
            <v-btn 
              rounded
              v-for="(val, i) in item.actions" :key='i'
              :outlined="val != 'approve'"
              :dark="val === 'approve'" 
              class="ma-1 body-1 text-capitalize"
              @click="actions(val)"
            >
              {{val}}
            </v-btn>
          </div>
      </template>

      </v-data-table>
  </div>
</template>

<script>
  import news from '@/services/news';
  import categories from '@/services/categories'
  // import httpClient from '@/services/httpClient'

  export default {
    data () {
      return {
        loading: true,
        link: '',
        title: '',
        categories: [],
        rows: [],
        selGroups: null,
        allGroups: [],
        status: ['In Queue', 'Published', 'Approved', 'Edit Reuired'],
        headers: [
          { text: 'News Headline', value: 'news', class:"body-1 black--text font-weight-bold" },
          { text: 'Group', value: 'group', class:"body-1 black--text font-weight-bold" },
          { text: 'URL', value: 'url', class:"body-1 black--text font-weight-bold", width:"10" },
          { text: 'Link added', value: 'link', class:"body-1 black--text font-weight-bold" },
          { text: 'Status', value: 'status', class:"body-1 black--text font-weight-bold" },
          { text: '', value: 'actions', class:"body-1 black--text font-weight-bold" ,sortable: false },
        ],
        totalHeaders: [
          {text: 'News Headline', value: 'news'},
          {text: 'Group', value: 'group'},
          {text: 'URL', value: 'url'},
          {text: 'Link added', value: 'link'},
          {text: 'Status', value: 'status'},
          {text: 'Schedule', value: 'schedule'},
          {text: 'Published', value: 'published'},
          {text: 'Assigned', value: 'assigned'}]
        }
    },
    mounted() {
      this.getNews()
      this.getCategories()
    },
    computed: {
      news() {
        return this.rows.filter(item => {
          let actions = []
          switch(item.status) {
            case 'Approved': 
              actions = ['edit'] 
              break
            case 'In Queue': 
              actions = ['edit', 'reject link', 'approve']
              break
            case 'Published': 
              actions = 'grey--text text--darken-1'
              break
            case 'Edits Required': 
              actions = ['view']
              break 
            default :
              actions = ['edit', 'reject link', 'approve']
              break
          }
          return item.actions = actions
        })
      }
    },
    methods: {
      actions(val) {
        switch(val) {
          case 'view': 
            this.$store.state.newsPreview = !this.$store.state.newsPreview
            console.log(val,this.$store.state.newsPreview)
            break
          case 'edit': 
            console.log(val)
            break
          case 'reject link': 
            console.log(val)
            break
          case 'approve': 
            console.log(val)
            break
        }
      },
      removeGroup (item) {
        const index = this.selGroups.indexOf(item.id)
        if (index >= 0) this.selGroups.splice(index, 1)
      },
      checkHeader(value) {
        return this.headers.findIndex((item) => item.value === value)
      },
      updateHeader(item) {
        let index = this.checkHeader(item.value)
        let length = this.headers.length - 1
        if(index < 0)
          this.headers.splice(length,0,{ text: item.text, value: item.value, class:"body-1 black--text font-weight-bold" })
        else this.headers.splice(index,1)
      },
      async getNews() {
        try {
          const response = await news.getNews()
          this.rows = response.data.rows
          this.rows.splice(0,0,{id: 0})
          this.rows.splice(0,0,{id: -1})
          console.log("rows", this.rows)
          this.loading = false
        } catch (error) {
          console.log("error",error)
        }
      },
      async addNews() {
        try {
          let data = {
            title: this.title,
            link: this.link,
            categories: this.selGroups,
            dated: new Date()
          }
          console.log(data)
          const response = await news.addNews(data)
          console.log(response)
        } catch (error) {
          console.log("error",error)
        }
      },
      async getCategories() {
        try {
          const response = await categories.get()
          this.allGroups = response.data.rows
          console.log("categories",this.allGroups)
        } catch (error) {
          console.log("error",error)
        }
      },
      getTextColor(type) {
        let color = ''
        switch(type) {
          case 'Approved': 
            color = 'green--text text--darken-2'
            break
          case 'In Queue': 
            color = 'yellow--text text--darken-3'
            break
          case 'Published': 
            color = 'grey--text text--darken-1'
            break
          case 'Edits Required': 
            color = 'red--text text--lighten-1'
            break 
          default :
            color = 'yellow--text text--darken-3'
            break
        }
        return color
      }
    },
  }
  </script>

<style>
 .news.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0 !important ;
}
.news-selector.v-list-item--dense, .v-list--dense .v-list-item{
  height: 0 !important;
}
.news-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 8px;
}
</style>

<style scoped>
  .customize .v-list-item{
  min-height: 33px !important;
}
  .text-btn.v-btn:before {
  background-color: white !important;
}
</style>
