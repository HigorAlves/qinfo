import React from 'react'

import { IVehicle } from '@jetpack/interfaces'
import Link from 'next/link'

import styles from '~/assets/Home.module.css'

type IProps = IVehicle

export function VehicleCardComponent({ id, renavam, placa }: IProps) {
	return (
		<Link href={`/`}>
			<section className={styles.card} key={id}>
				<h2>Placa</h2>
				<p>{placa}</p>

				<h2>Renavam</h2>
				<p>{renavam}</p>
			</section>
		</Link>
	)
}
