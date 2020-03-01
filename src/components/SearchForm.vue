<template>
	<form @submit.prevent="search">
		<div class="field has-addons">
		  <div class="control  has-icons-left" style="width: 100%">
		    <input class="input" type="text" placeholder="type a city" v-model="form.input" ref="field" @input="validateForm">
			<span class="icon is-small is-left">
			  <i class="fas fa-city"></i>
			</span>
			<div class="drop" v-show="openDrop">
				<ul>
					<template v-if="autoComplete.length">
						<li v-for="(a, index) in autoComplete" :key="index">
							<a href="#!" @click.prevent="selectSuggest(index)">{{ a.LocalizedName }}</a>
						</li>
					</template>
					<template v-else>
						<li><p>No Suggestions found.</p></li>
					</template>
				</ul>
			</div>
		  </div>
		  <div class="control">
		    <button type="submit" class="button is-info">
		    	<i class="fa fa-search"></i>
		    </button>
		  </div>
		</div>
		<p class="help is-danger" v-show="!form.valid && err.show">{{ err.message }}</p>
		<div v-show="form.isLoading">
			<div class="custom-loader center"><div></div><div></div><div></div><div></div></div>
		</div>
	</form>
</template>

<script>
import {localStorage} from '@/config/localStorage'
import axios from 'axios'
const API_KEY = 'AvK4c5zsAsB0nBVuCHiggzdDi2qhtpZV'
const API_AUTO_COMPLETE_URL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
const GET_CURRENT_WEATHER = 'http://dataservice.accuweather.com/currentconditions/v1/';
const GET_5_DAYS = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

	export default {
		data() {
			return {
				localStorage,
		  		form: {
		  			input: 'Tel Aviv',
		  			isLoading: false,
		  			valid: true
		  		},
		  		err: {
		  			show: false,
		  			message: 'English letters only'
		  		},
		  		autoComplete: [],
		  		openDrop: false,
		  		selectedCityKey: 215854,
			}
		},

		mounted() {

			// if route has params then set those params,
		  	const routeParams = this.$route.params;
		  	if(routeParams.hasOwnProperty('city')) {
		  		this.$set(this.form, 'input', routeParams.city.name);
		  		this.$set(this, 'selectedCityKey', routeParams.city.key);
		  	}

			this.search();
			this.autoFocus();
		},

		methods: {

			// axios call handler
			makeAxiosCall(url, callback) {
				this.$set(this.form, 'isLoading', true);

				axios.get(url)
				.then(response => {
					callback && typeof callback == 'function' && callback(response);
				})
				.catch(err => {
					this.$toasted.show(err.message);
				})
				.finally( _ => {
					this.$set(this.form, 'isLoading', false);
				});
			},

			// search for selected city data from api
			search() {

				if(!this.form.valid) return;

				let url = GET_CURRENT_WEATHER;
				url += this.selectedCityKey;
				url += '?apikey=' + API_KEY;

				this.makeAxiosCall(url, response => {
					if(response.status === 200) {
						let data = {};
						data.city = response.data[0];
						data.cityName = this.form.input;
						this.get5days(data);
					} else {
						this.$toasted.show(response.statusText);
					}
				});
			},

			// get 5 days for selected city from api
			get5days(data) {

				let url = GET_5_DAYS;
				url += this.selectedCityKey;
				url += '?apikey=' + API_KEY;
				url += '&metric=true';

				this.makeAxiosCall(url, response => {
					if(response.status === 200) {
						data.cityKey = this.selectedCityKey;
						data.daily = response.data.DailyForecasts; 
						this.$emit('setWeatherData', data);
					} else {
						this.$toasted.show(response.statusText);
					}
				});
				
			},

			// validate search input
			validateForm() {
				//validate english letters only
				const letersOnlyRegex = /^[A-Za-z\s]+$/;
				const valid = letersOnlyRegex.test(this.form.input);

				this.$set(this, 'openDrop', false);
				this.$set(this.form, 'valid', true);
				this.$set(this.err, 'show', !valid);

				if(!valid)  {
					this.$set(this.form, 'valid', false);
				} else {
					this.getAutoComplete()
				}
			},

			// get auto complete words array from api
			getAutoComplete() {
				let url = API_AUTO_COMPLETE_URL;
				url += '?apikey=' + API_KEY;
				url += '&q=' + this.form.input;

				this.$set(this, 'autoComplete', []);
				
				this.makeAxiosCall(url, response => {
					if(response.status === 200) {
						this.$set(this, 'autoComplete', response.data);
						this.$set(this, 'openDrop', true);
					} else {
						this.$toasted.show(response.statusText);
					}
				});
			},

			// select the suggested auto complete word
			selectSuggest(index) {
				this.$set(this.form, 'input', this.autoComplete[index].LocalizedName);
				this.$set(this, 'selectedCityKey', this.autoComplete[index].Key);
				this.$set(this, 'openDrop', false);
				this.$nextTick(() => {
					this.search();
				});
			},

			// auto focus on inout field
			autoFocus() {
				this.$refs.field.focus();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drop {
	    position: absolute;
	    width: 100%;
	    max-height: 139px;
	    overflow: auto;
	    box-shadow: 0px 4px 8px rgba(#000, .2);
	    li {
	    	background-color: #f5f5f5;
	    	border-bottom: 1px solid #bbb;
	    	a , p{
	    		color: #777;
	    		padding: 5px 15px;
	    		display: block;
	    	}
	    	&:hover {
	    		a {color: #3298dc;}
	    	}
	    }
	}

	form {
		max-width: 500px;
		width: 100%;
		margin: auto;
		padding: 0 15px;
		margin-bottom: 40px;
		position: relative;
		z-index: 1;
	}
</style>