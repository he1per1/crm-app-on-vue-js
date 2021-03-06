import _ from 'lodash'

export default {
	data() {
		return {
			pageSize: 3,
			pageCount: 0,
			allItems: [],
			items: [],
			page: this.$route.query.page || 1,
		}
	},
	methods: {
		changePage(page) {
			this.$router.push(`${this.$route.path}?page=${page}`)
			this.items = this.allItems[page - 1] || this.allItems[0]
		},
		setupPagination(items) {
			this.allItems = _.chunk(items, this.pageSize)
			this.pageCount = _.size(this.allItems)
			this.items = this.allItems[this.page - 1] || this.allItems[0]
		},
	},
}
