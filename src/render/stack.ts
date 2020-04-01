import { Stack } from './index.h'

export const nodeStack: any[] = []

let currentActiveStack: Stack

export const activeStack = {
	get: () => currentActiveStack,
	replace(stack: Stack) {
		currentActiveStack = stack
	},
	getElementNode: () => currentActiveStack.node,
}
