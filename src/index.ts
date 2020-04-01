import { using, h, nodeStack } from './render/index'

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

console.log(nodeStack)
