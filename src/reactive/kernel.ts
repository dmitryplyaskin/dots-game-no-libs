// type AnyObject = { [key: string]: any }

interface Event<T> {
	(value: T): void
	subscriber: any[]
	// id: symbol
	[key: string]: any
}

type Unit<T = any> = {
	subscribers: Map<any, any>
	on: (e: Event<T>, fn: (v: any) => T) => Unit<T>
	emit: (e: any) => (fn: any) => void
	watch: (v: T) => void
}

// type Node = {
// 	type: 'event' | 'store'
// }

export function createUnit<T>(): Unit {
	const unit: Unit = {} as Unit
	unit.subscribers = new Map()
	unit.on = (e: Event<T>, fn: (v: any) => T) => {
		const us = unit.subscribers
		if (!us.has(e)) {
			us.set(e, { data: [] })
		}
		us.get(e).data.push(fn)
		e.subscriber.push(unit.emit(e))

		return unit
	}
	unit.emit = <P>(e: Event<T>) => {
		const us = unit.subscribers
		if (!us.get(e)?.data) {
			return
		}
		return (data: (v: P) => T) => {
			us.get(e).data.forEach((fn: any) => {
				fn(data)
			})
			if (us.has('watch')) {
				us.get('watch').data.forEach((fn: any) => fn(data))
			}
		}
	}
	unit.watch = (fn: (p: T) => void) => {
		const us = unit.subscribers
		if (!us.has('watch')) {
			us.set('watch', { data: [] })
		}
		us.get('watch').data.push(fn)
		return
	}
	return unit
}

export function createEvent<T>(): Event<T> {
	const event: Event<T> = (value: T) => {
		event.subscriber.forEach((fn: (value: T) => void) => {
			fn(value)
		})
	}
	event.subscriber = []
	// event.id = Symbol('event')
	return event
}

const u = createUnit<string>()
const e = createEvent<string>()
u.on(e, v => v)

u.watch(e => console.log('wow-1', e))

e('1')
e('2')
e('3')
