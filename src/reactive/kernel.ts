// type AnyObject = { [key: string]: any }

interface Event<T> {
	(value: T): void
	subscriber: any[]
	subscribers: Map<any, any>
	watch: (v: T) => void
	// id: symbol
	[key: string]: any
}

type Store<T = any> = {
	subscribers: Map<any, any>
	on: (e: Event<T>, fn: (v: any) => T) => Store<T>
	emit: (e: any) => (fn: any) => void
	watch: (v: T) => void
	getState: () => T
}

// type Node = {
// 	type: 'event' | 'store'
// }

export function createStore<T>(initialValue: T): Store {
	let state = initialValue
	const store: Store = {} as Store
	store.subscribers = new Map()
	store.on = (e: Event<T>, fn: (v: any) => T) => {
		const us = store.subscribers
		if (!us.has(e)) {
			us.set(e, { data: [] })
		}
		us.get(e).data.push(fn)
		e.subscriber.push(store.emit(e))

		return store
	}
	store.emit = (e: Event<T>) => {
		const us = store.subscribers
		if (!us.get(e)?.data) {
			return
		}
		return (data: T) => {
			us.get(e).data.forEach((fn: any) => {
				if (data !== state) {
					state = fn(data)
					if (us.has('watch')) {
						us.get('watch').data.forEach((fn: any) => {
							fn(data)
						})
					}
				}
			})
		}
	}
	store.watch = (fn: (p: T) => void) => {
		const us = store.subscribers
		if (!us.has('watch')) {
			us.set('watch', { data: [] })
		}
		us.get('watch').data.push(fn)
		us.get('watch').data.forEach((fn: any) => fn(state))
		return
	}
	store.getState = () => {
		return state
	}
	return store
}

export function createEvent<T>(): Event<T> {
	const event: Event<T> = (value: T) => {
		event.subscriber.forEach((fn: (value: T) => void) => {
			fn(value)
		})
		if (event.subscribers.has('watch')) {
			event.subscribers.get('watch').data.forEach((fn: any) => fn(value))
		}
	}
	event.subscribers = new Map()
	event.subscriber = []
	event.watch = fn => {
		const es = event.subscribers
		if (!es.has('watch')) {
			es.set('watch', { data: [] })
		}
		es.get('watch').data.push(fn)
		return
	}

	// event.id = Symbol('event')
	return event
}

const $store = createStore<string>('asd')
const event = createEvent<string>()
$store.on(event, v => v)

$store.watch(e => console.log('store', e))

event('1')
event('1')
event('3')
