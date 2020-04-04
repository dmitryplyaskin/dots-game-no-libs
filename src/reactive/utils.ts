export function createWatch<T>(
	sub: Map<any, any>,
	type: 'event' | 'store',
	state?: T
) {
	if (!sub.has('watch')) {
		sub.set('watch', { data: [] })
	}
	return (fn: any) => {
		sub.get('watch').data.push(fn)
		if (type === 'store') {
			sub.get('watch').data.forEach((fn: any) => fn(state))
		}
		return
	}
}
