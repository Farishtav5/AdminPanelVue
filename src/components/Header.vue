<script>

</script>

<template>
    <div>
        <v-toolbar color="1A101F" dark>
          <div class="d-flex align-center">
            <v-img
              alt="Nibbin Logo"
              contain
              src="./../assets/images/Layer 2.svg"
              transition="scale-transition"
              width="150px"
            />
            <v-text-field
              rounded
              style="width:550px"
              dense
              class="mt-7 custom-search"
              outlined
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-login</v-icon>
          </v-btn>
          <span>Logout</span>
        </v-toolbar>
    </div>
</template>

<style >
/* .custom-search.v-input__control.v-input__slot.v-input__prepend-inner.v-input__icon.v-icon {
  color: red!important;
} */
/* .v-icon.v-icon {
  color: red!important;
} */
.v-text-field.v-input--dense .v-input__prepend-inner.v-input__icon.v-icon {
  color: red!important;
}
</style>