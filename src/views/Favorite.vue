<template>
	<section class="pt-60 pb-60 h-100vh">
		<div class="container">
			<h2 class="title">Favorite Cities</h2>
			<div class="favorites flex flex-wrap">
				<template v-if="favorites.length">
					<div 
					class=" favorite text-center"
					v-for="(fav, index) in favorites"
					:key="index"
					@click="selectFavorite(index)"
					>
						<h3>{{ fav.cityName }}</h3>
					 	<img :src="`https://www.accuweather.com/images/weathericons/${fav.weatherIcon}.svg`" alt="">
					 	<h4 class="temp">{{ dayTemperature(index) }}</h4>
					</div>
				</template>
				<template v-else>
					<div class="notification is-danger">
					  Favorite is empty.
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<script>
import {localStorage} from '@/config/localStorage'

	export default {
		data() {
			return {
				localStorage,
				favorites: []
			}
		},

		mounted() {
			this.$set(this, 'favorites', localStorage.get());
		},

		methods: {

			// select favorite to display
			selectFavorite(index) {
				this.$router.push({
					name: 'Home',
					params: {
						city: {
							key: this.favorites[index].cityKey,
							name: this.favorites[index].cityName
						}
					}
				});
			},

			// get the temperature of certain day
			dayTemperature(index) {
        	const unit = localStorage.state.unit; // metric / imperial
        	console.log(unit)
			return Math.round(this.favorites[index].temperature[unit].Value) + ' ' + this.favorites[index].temperature[unit].Unit;
			},
		}
	}
</script>

<style lang="scss" scoped>

	.container {
		padding: 0 15px;
	}

	.favorites {
		.favorite {
			width: calc(100% / 5 - 15px + (15px / 5));
			margin-right: 15px;
			margin-bottom: 15px;
			@media(min-width: 992px) {
				&:nth-child(5n) {margin-right: 0;}
			}
			@media(max-width: 991px) and (min-width: 768px) {
				width: calc(100% / 4 - 15px + (15px / 4));
				&:nth-child(4n) {margin-right: 0;}
			}
			@media(max-width: 767px) and (min-width: 576px) {
				width: calc(100% / 3 - 15px + (15px / 3));
				&:nth-child(3n) {margin-right: 0;}
			}
			@media(max-width: 575px) {
				width: calc(100% / 2 - 15px + (15px / 2));
				&:nth-child(2n) {margin-right: 0;}
			}
			border: 1px solid #ddd;
			background-color: #3298dc;
			color: #fff;
			padding: 30px 15px;
			border-radius: 4px;
			box-shadow: 0px 4px 8px rgba(#000, .2);
			h3 {
				font-size: 24px;
				// margin-bottom: 15px;
			}

			img {
				max-width: 70px;
				width: 100%;
				margin: 10px auto;
			}

			&:hover, &:focus {
				transform: scale(1.05);
				box-shadow: 0px 0px 6px rgba(#000, .1);
				cursor: pointer;
			}
		}
	}
</style>