<template>

  <v-card>

    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details>
      
      </v-text-field>
      
    </v-card-title>

    <v-container v-for="dessert in desserts" :key="dessert" >

        <template>
            <v-card
                :headers="headers" 
                :items="desserts" 
                :search="search"
                class="mx-auto"
                max-width="344"
                outlined
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">makanan</div>
                    <v-list-item-title class="headline mb-1">{{editedItem.name}}</v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-container>

    <template v-slot:top>
    
    <v-toolbar flat color="white">
        <v-toolbar-title>Crud Atma pedia</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
        
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">buat makanan</v-btn>
        </template>
        
        <v-card>
            
            <v-card-title>
            <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            
            <v-card-text>
            
            <v-container>
                
                <v-row>
                
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-col>
                
                </v-row>
            
            </v-container>
            
            </v-card-text>
            
            <v-card-actions>

            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            
            </v-card-actions>

        </v-card>

        </v-dialog>

    </v-toolbar>
    </template>
   
  </v-card>

</template>

// ========================== SCRIPT ======================

<script>

import { dessertsRef } from '../firebase';

export default {
  data: () => ({
    cek: -1,
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
  firebase: {
    desserts : dessertsRef
  },
  computed: {
    formTitle () {
      return this.cek === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  created(){

  },
  methods: {
    editItem (item) {
      this.editedIndex = item['.key']
      this.cek = 0
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && dessertsRef.child((item['.key'])).remove()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    clear(){
      this.editedItem={}
      this.editedItem.name= ''
      this.editedItem.calories= 0
      this.editedItem.fat= 0
      this.editedItem.carbs= 0
      this.editedItem.protein= 0 
      this.cek= -1
    },
    // methods untuk save
    save () {
      if (this.cek > -1) {
        dessertsRef.child(this.editedIndex).set({name: this.editedItem.name,
        calories: this.editedItem.calories,
        fat: this.editedItem.fat,
        carbs: this.editedItem.carbs,
        protein: this.editedItem.protein})
        this.clear()
      }else{
        dessertsRef.push({name: this.editedItem.name,
        calories: this.editedItem.calories,
        fat: this.editedItem.fat,
        carbs: this.editedItem.carbs,
        protein: this.editedItem.protein})
        this.clear()
      }
      this.close()
    },
  },
}
</script>