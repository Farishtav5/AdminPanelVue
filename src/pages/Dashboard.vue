<script>
import Tile from "@/components/Tile"
import News from "@/components/News"

export default {
    components: {
       Tile,
       News
    }
    
}
</script>

<template>
    <v-container style= "background: #F2F2F2 100% 100% no-repeat" fill-height fluid>
        <div class="mx-15 my-3">
            <!-- <NewsDrawer /> -->
            <Tile />
            <News />
            
        </div>
        <!-- <v-row>
            <v-col cols="10" offset-md="1">
                <Tile />
                <News />
            </v-col>
        </v-row> -->
        
    </v-container>
</template>

<style scoped>
.container.fill-height {
    display: block !important;
}
</style>