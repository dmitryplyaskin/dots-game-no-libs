import { using, h, nodeStack } from './render'
import { createUnit } from './reactive'

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

const fn = (a: any) => console.log(a)

const testUnit = createUnit()
testUnit.on('test', fn)
testUnit.emit('test', { a: 12 })
testUnit.emit('test', { a: 13 })
testUnit.emit('test', { a: 14 })
