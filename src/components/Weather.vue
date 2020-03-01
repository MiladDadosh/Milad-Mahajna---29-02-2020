<template>
  <div class="weather-wrap" :style="`background-image: url(${require('@/assets/cloud-bg.jpg')})`" v-if="data.city">
    <div class="weather-header flex flex-center flex-justify-space-between">
      <div class="weather-header-item flex flex-center">
        <div>
          <img :src="`https://www.accuweather.com/images/weathericons/${data.city.WeatherIcon}.svg`" alt="">
        </div>
        <div>
          <h3><b>{{ data.cityName }}</b></h3>
          <h4>{{ temperature }} </h4>
        </div>
      </div>
      <div class="weather-header-item">
        <button :class="'button ' + favoriteStyle" @click="toggleFavorite">
          <i class="fa fa-heart" style="margin-right: 10px;"></i>
          <b>{{ favoriteText }}</b>
        </button>
      </div>
    </div>
    <div class="weather-body">
      <div class="weather-status text-center">
        {{ data.city.WeatherText }}
      </div>
      <div class="weather-daily" v-if="data.daily.length">
        <div class="text-center" v-for="(day, index) in data.daily" :key="index">
          <h3 class="weekday">{{ getWeekDay(index) }}</h3>
          <img :src="`https://www.accuweather.com/images/weathericons/${day.Day.Icon}.svg`" alt="">
          <h4 class="temp">{{ dayTemperature(index, 'Maximum') }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weekdays from '@/config/weekdays'
import {localStorage} from '@/config/localStorage'

  export default {
    props: ['data'],

    data() {
      return {
        weekdays,
        localStorage,
        cityIsFavorite: false,
      }
    },

    mounted() {
      this.checkFavorite();

      //scroll to targeted view
      this.$nextTick(_ => {
        document.querySelector('.weather-wrap').scrollIntoView({behavior: 'smooth'})
      });
    },

    computed: {
      temperature() {
        const unit = localStorage.state.unit; // metric / imperial
        return Math.round(this.data.city.Temperature[unit].Value) + ' ' + this.data.city.Temperature[unit].Unit;
      },

      favoriteStyle() {
        return this.cityIsFavorite ? 'is-danger' : 'is-success';
      },

      favoriteText() {
        return this.cityIsFavorite ? 'Remove From Favorite' : 'Add To Favorite';
      }
    },

    methods: {

      // get the day of week
      getWeekDay(index) {
        return this.weekdays[new Date(this.data.daily[index].Date).getDay()];
      },

      // get the temperature of certain day
      dayTemperature(index, type) {
      return Math.round(this.data.daily[index].Temperature[type].Value) + ' ' + this.data.daily[index].Temperature[type].Unit;
      },

      // check favorite status
      checkFavorite() {
        this.$set(this, 'cityIsFavorite', localStorage.isExistId(this.data.cityKey));
      },

      // toggle favorite - add / remove from local storage
      toggleFavorite() {
        if(localStorage.isExistId(this.data.cityKey)) {
          localStorage.remove(this.data.cityKey);
          this.$set(this, 'cityIsFavorite', false);
        } else {
          localStorage.add({
            cityName: this.data.cityName,
            cityKey: this.data.cityKey,
            temperature: this.data.city.Temperature,
            weatherIcon: this.data.city.WeatherIcon
          })
          this.$set(this, 'cityIsFavorite', true);
        }
      }
      
    }
  }
</script>


<style lang="scss" scoped>
  .weather-wrap {
    padding: 30px;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    box-shadow: 0px -3px 6px rgba(#000, .1);
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(#000, .4);
    }

    *{color:#eee;}
    > div {position: relative;}

    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 20px;
    }
  }

  .weather-header {
    .weather-header-item {
      img {
        width: 100%;
        max-width: 70px;
        margin-right: 10px;
      }
    }
  }

  .weather-status {
    font-size: 76px;
    padding: 40px 0;
  }

  .weather-daily {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      width: calc(100% / 5 - 15px);
      margin-right: 15px;
      background: rgba(#000, 0.4);
      padding: 30px 15px;
      border-radius: 4px;

      img {
        max-width: 70px;
        width: 100%;
        margin: 10px auto;
      }

      &:hover, &:focus {
        // transform: scale(1.05);
        transform: translatey(-20px);
      }
    }
  }
</style>