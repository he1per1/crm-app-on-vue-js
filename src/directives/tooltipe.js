export default {
	bind(el, { value }) {
		M.Tooltip.init(el, { html: value, position: 'top' })
	},
	unbind(el) {
		const tooltipe = M.Tooltip.getInstance(el)
		if (tooltipe && tooltipe.destroy) {
			tooltipe.destroy()
		}
	},
}
