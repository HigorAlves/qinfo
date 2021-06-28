export function dateFormat(date: Date) {
	return new Intl.DateTimeFormat('pt-BR', {
		timeZone: 'America/Sao_Paulo',
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	}).format(new Date(date))
}

export function dateFormatSmall(date: Date) {
	return new Intl.DateTimeFormat('pt-BR', {
		timeZone: 'America/Sao_Paulo',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date))
}

export function moneyFormat(money: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(money)
}
