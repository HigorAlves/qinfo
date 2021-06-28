import { IResponse, IVehicle } from '@jetpack/interfaces'

import { API } from '~/services/api'

export async function getList() {
	const { data }: { data: IResponse<IVehicle[]> } = await API.get(
		'/vehicle/list'
	)
	if (data.status === 200) {
		return data.data
	}

	return null
}
