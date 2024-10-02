export const formatterBRL = (value: number) => {

	const cloneValue = value

	const valueS = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(cloneValue || 0)
	return valueS
}

export const parserBRL = (value: string) => {

	let cloneValue = value

	cloneValue = cloneValue.replace(/\D/g, '')
	let valueN = parseFloat(cloneValue || '0')
	valueN /= 100
	return valueN
}
