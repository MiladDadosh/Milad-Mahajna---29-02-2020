<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <a class="navbar-item" href="/">
        <h2>Weather App</h2>
      </a>
    
      <a role="button" class="navbar-burger burger" :class="{'is-active': navbarIsActive}" aria-label="menu" aria-expanded="false" data-target="navbar-basic" @click="toggleNavbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar-basic" class="navbar-menu" :class="{'is-active': navbarIsActive}">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field tempSwitchWrap">
          <input id="darkTheme" type="checkbox" name="darkTheme" class="switch is-outlined is-info" @change="toggleDarkTheme">
          <label for="darkTheme">Dark Theme</label>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <span @click="toggleNavbar()">
            <router-link class="navbar-item" to="/">Home</router-link>
          </span>
          <span @click="toggleNavbar()">
            <router-link class="navbar-item" to="/Favorite">Favorite</router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        navbarIsActive: false,
        isFahrenheit: false
      }
    },

    methods: {
      toggleNavbar() {
        this.$set(this, 'navbarIsActive', !this.navbarIsActive);
      },

      toggleDarkTheme() {
        document.body.classList.toggle('dark')
      }
    }
  }
</script>


<style lang="scss" scoped>
  nav {
    background-color: #f5f5f5;
  }

  @media screen and (min-width: 1024px) {
    .navbar-menu a:not(:last-child) {
      border-right: 1px solid #ddd;
    }
  }
  @media screen and (max-width: 1023px) {
    .navbar-menu a:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
</style>