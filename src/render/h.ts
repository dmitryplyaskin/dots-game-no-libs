import { activeStack, nodeStack } from './stack'

function h(tag: keyof HTMLElementTagNameMap, cb: () => void): void
function h(tag: keyof HTMLElementTagNameMap, spec: any): void
function h(tag: keyof HTMLElementTagNameMap, spec: any, cb: () => void): void
function h(tag: any, opt: any, cb?: any) {
	const node = document.createElement(tag)
	if (typeof opt === 'function') {
		cb = opt
	}
	const parent = activeStack.get()
	const currentStack = {
		child: [],
		node: {},
	}
	activeStack.replace(currentStack)
	if (cb) {
		nodeStack.push({ node })
	}
	activeStack.replace(parent)
}

export { h }
