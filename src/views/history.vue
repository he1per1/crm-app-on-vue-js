<template>
	<div>
		<div class="page-title">
			<h3>История записей</h3>
		</div>

		<div class="history-chart">
			<canvas ref="canvas"></canvas>
		</div>

		<loader v-if="loading" />

		<p class="center" v-else-if="!records.length">
			Записей пока нет.
			<router-link tag="a" to="/record">Создать категорию</router-link>
		</p>

		<section v-else>
			<history :records="items" />

			<paginate
				v-model="page"
				:page-count="pageCount"
				:click-handler="changePage"
				:prev-text="'Prev'"
				:next-text="'Next'"
				:container-class="'pagination'"
				:page-class="'waves-effect'"
			>
			</paginate>
		</section>
	</div>
</template>

<script>
import pagination from '@/mixins/pagination'
import history from '@/components/historyTable'
import currency from '@/filters/currency'

import { Pie } from 'vue-chartjs'

export default {
	mixins: [pagination],
	extends: Pie,
	data: () => ({
		loading: true,
		records: [],
		categories: [],
	}),
	async mounted() {
		this.records = await this.$store.dispatch('fetchRecords')
		this.categories = await this.$store.dispatch('fetchCategories')

		this.setup()

		this.chart()

		this.loading = false
	},
	methods: {
		setup() {
			this.setupPagination(
				(this.records = this.records.map(record => {
					return {
						...record,
						categoryName: this.categories.find(r => r.id === record.category)
							.title,
						typeClass: record.type === 'income' ? 'green' : 'red',
						typeText: record.type === 'income' ? 'Доход' : 'Расход',
					}
				})),
			)
		},
		chart() {
			this.renderChart({
				labels: this.categories.map(c => c.title),
				datasets: [
					{
						label: 'Расходы по категориям',
						data: this.categories.map(c => {
							return this.records.reduce((total, record) => {
								if (record.category === c.id && record.type === 'outcome') {
									total += +record.amount
								}
								return total
							}, 0)
						}),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			})
		},
	},
	components: { history },
}
</script>

<style scoped>
.pagination {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}
</style>
