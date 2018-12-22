<template>
  <div id="master-container" @click='closePopup'>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">       
          <a href="#" class="popup-button text-right" 
          @click.prevent="showPopup = !showPopup" 
          :title="showPopup ? 'Close Popup' : 'Open Popup'" 
          role='button'>
            <i class="fa" 
            :class="{'fa-chevron-down': showPopup, 'fa-chevron-right': !showPopup}" 
            aria-hidden="true"></i>
            <span class="name-span" v-show="checkedItems.length === 0">Choose City</span>
            <span class="name-span" v-show="checkedItems.length !== 0"> {{ checkedItems.length }} {{ checkedItems.length == 1 ? 'item' : 'items' }} selected</span>
          </a>   
          <div class="checkbox-container items" v-show="showPopup">
            <div id="triangle"></div>
            <a href="#" 
            @click.prevent="toggleCheckAll" 
            v-show="inMobile" class='mobile-checkbox' 
            :class="{'active-item': itemsCheckAllState}">Select All</a>                    
            
            <input type="checkbox" 
            v-model="itemsCheckAllState" 
            v-show="notInMobile" 
            @click="toggleCheckAll">

            <label v-show="notInMobile">Select All Cities</label> 
            <div v-for="(item, index) in items" :key="index">              
              <label hidden :for="item.id">Choose {{ item.title }}</label>
              <input type="checkbox" :value="item" 
              v-model="checkedItems" 
              v-show="notInMobile" 
              :id="item.id">
              <label v-show="notInMobile">{{ item.title }}</label> 
              <a href="#" 
              @click.prevent="togglecheckedItems(item.title, item.id)" 
              v-show="inMobile" class='mobile-checkbox' 
              :class="{'active-item': isAlreadyIncheckedItems(item.title)}">{{ item.title }}</a>                            
            </div>
          </div>       
        </div>                 
      </div>
    </div>
  </div>
</template>

<script>
import data from './data.js';
export default {
  name: 'App',
  created: function(){
    this.items = data.items;
  },
  data: function () {
    return {
        items: [],
        itemsCheckAllState: false,
        showPopup: false, 
        checkedItems: []              
      }
  },
  watch: {
    checkedItems: function (oldVal, newVal) {
      if (this.checkedItems.length < this.items.length) {
          this.itemsCheckAllState = false;
      }
    }
  },  
  methods: {
    closePopup: function(e){
      if(e.srcElement.className == 'col-md-4 col-md-offset-4' || e.srcElement.className == 'row' ||  e.srcElement.id == 'master-container'){
        this.showPopup = false;
      }
    },
    isAlreadyIncheckedItems: function (title) {
      return this.checkedItems.filter(function (item) {
          return item.title === title;
      }).length > 0;
    },    
    toggleCheckAll: function () {
      if (this.notInMobile) {
        if (this.checkedItems.length == this.items.length) {
            this.checkedItems = [];
        } else {
          for (var i = 0; i < this.items.length; i++) {
            if (!this.isAlreadyIncheckedItems(this.items[i].title)) {
                this.checkedItems.push({ title: this.items[i].title, id: this.items[i].id });
            }
          }
        }
      } else {
        if (this.itemsCheckAllState) {
          this.checkedItems = [];
          this.itemsCheckAllState = false;
        } else {
          for (var i = 0; i < this.items.length; i++) {
            if (!this.isAlreadyIncheckedItems(this.items[i].title)) {
                this.checkedItems.push({ title: this.items[i].title, id: this.items[i].id });
            }
          }
          this.itemsCheckAllState = true;
        }
      }
    },    
    togglecheckedItems: function (title, id) {
      if (this.isAlreadyInCheckedItems(title)) {
        for (var i = 0; i < this.checkedItems.length; i++) {
            if (this.checkedItems[i].title == title) {
              this.checkedItems.splice(i, 1);
            }
        }
      } else {
          this.checkedItems.push({ title: title, id: id });
      }
    },
    isAlreadyInCheckedItems: function (title) {
      return this.checkedItems.filter(function (item) {
          return item.title === title;
      }).length > 0;
    }      
  },
  computed: {
    inMobile: function () {
        return window.innerWidth < 768;
    },    
    notInMobile: function () {
        return window.innerWidth > 767;
    }      
  }
}
</script>

<style lang="scss">
#master-container {

  padding-top: 30px;

  .popup-button {
    display: block;
    min-height: 50px;
    border: 1px solid #c78700;
    border-radius: 4px;
    position: relative;
    max-width: 200px;
    margin: 0 auto;     
      .name-span {      
        position: absolute;
        left: 40px;
        top: 11px;
        font-size: 18px;
        color: #252323;        
      }
      .selected-span {
        position: absolute;
        right: 0;
        top: 14px;
        margin-right: 10px;      
      }
      .fa {
        position: absolute;
        left: 10px;
        top: 17px;
        font-size: 18px;
        color: #252323;    
      }
  } 

  .checkbox-container {
    border: #c78700 solid 2px;
    margin-top: 20px; 
    .mobile-checkbox {
      background: #c78700;
      display: block;
      margin-bottom: 10px;
      padding: 10px 9px;
      font-size: 16px;
      color: white;   
        &.active-item {
          background: #674601;
        }
    }        
  }

  .items {    
    position: relative;
    background: white;
    color: black;
    z-index: 5;
    padding: 12px 20px;
    border-radius: 5px;
    max-width: 220px;
    margin: 0 auto;
    margin-top: 17px;
  }

  #triangle {
      position: absolute;
      left: 49%;
      top: -7px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #c78700;
      display: block;
  }  
}
   

@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/variables";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/normalize";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/scaffolding";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/component-animations";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/type";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/grid";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/panels";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/navs";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/forms";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/utilities";
@import "../../../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap/responsive-utilities";
</style>