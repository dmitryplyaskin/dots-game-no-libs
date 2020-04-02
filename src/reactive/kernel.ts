type Unit = {
	on: (e: any, fn: any) => Unit
	emit: (e: any, fn: any) => void
}

type Node = {
	type: 'event' | 'store'
}

const createNode = ({ type }: Node) => {}

export function createUnit(): Unit {
	let listeners: { [key: string]: any } = {}
	const unit: Unit = {} as Unit
	unit.on = (e: any, fn: any) => {
		if (!listeners[e]) {
			listeners[e] = {}
			listeners[e].data = []
		}
		listeners[e].data.push(fn)
		return unit
	}
	unit.emit = (e: any, data: any) => {
		if (!listeners[e]?.data) {
			return
		}
		listeners[e].data.forEach((listener: any) => {
			listener(data)
		})
	}
	return unit
}
// function createStore<T>(initValue: T){
//   let init = initValue
//   let unit: {[key: string]: any} = {}
//   unit.on = (event, fn) => {

//   }
// }
