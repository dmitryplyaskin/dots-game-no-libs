import { using, h, nodeStack } from './render'
import { createStore } from './reactive'

const main = () => {
	const node = document.getElementById('app') as HTMLElement
	using(node, () => {
		h('div', () => {
			h('a', () => {})
			h('span', () => {})
		})
	})
}
main()

// const fn = (a: any) => a

const testUnit = createStore()
// testUnit.on(fn, console.log)
// testUnit.emit(fn, { a: 12 })
// testUnit.emit('test', { a: 13 })
// testUnit.emit('test', { a: 14 })
