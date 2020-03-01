<template>
	<section class="pt-60 h-100vh">
		<div class="">
			<div class="columns is-tablet is-multiline is-centered">

				<div class="column is-12">
					<searchForm @setWeatherData="setWeatherData"></searchForm>
				</div>

        <div class="column is-12">
          <div class="field tempSwitchWrap">
            <button class="button is-success is-light" @click="setTempUnit">
              {{ tempText }}
            </button>
          </div>
        </div>

				<div class="column p-0">
					<weather v-if="activateWeather" :data="weatherData"></weather>
				</div>

			</div>
		</div>
	</section>
</template>

<script>
import {localStorage} from '@/config/localStorage'
import searchForm from '@/components/SearchForm'
import weather from '@/components/Weather'

export default {
  name: 'Home',

  data() {
  	return {
      localStorage,
  		weatherData: {},
  		activateWeather: false,
      tempText: 'Metric',
  	}
  },

  methods: {
  	setWeatherData(data) {
  		this.$set(this.weatherData, 'city', data.city);
  		this.$set(this.weatherData, 'cityName', data.cityName);
  		this.$set(this.weatherData, 'cityKey', data.cityKey);
  		this.$set(this.weatherData, 'daily', data.daily);
  		this.$nextTick(_ => {
  			this.$set(this, 'activateWeather', true);
  		});
  	},

    setTempUnit() {
      if(this.tempText == 'Fahrenheit') {
        this.$set(this, 'tempText', 'Metric');
        localStorage.setUnit(false);
      } else {
        this.$set(this, 'tempText', 'Fahrenheit');
        localStorage.setUnit(true);
      }
    }
  },

  components: {
  	searchForm,
    weather
  }
}
</script>


<style lang="scss" scoped>
 .tempSwitchWrap {
  padding: 0 15px;
 }
</style>
