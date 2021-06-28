declare interface IResponse<T = void> {
	status: number
	error: boolean
	message: string
	data?: T
}
