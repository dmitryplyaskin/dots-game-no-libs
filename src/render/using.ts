import { Stack } from './index.h'
import { activeStack, nodeStack } from './stack'

export function using(node: HTMLElement, cb: () => void) {
	const stack: Stack = {
		child: [],
		node: {},
	}
	const parentStack = activeStack.get()
	activeStack.replace(stack)
	nodeStack.push({ node })
	cb()
	activeStack.replace(parentStack)
}
