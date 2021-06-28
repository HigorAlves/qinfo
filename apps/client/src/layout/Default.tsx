import React from 'react'

import Head from 'next/head'

interface IProps {
	children: React.ReactNode
}

const DefaultLayout = ({ children }: IProps) => (
	<>
		<Head>
			<title>Novac Bull - Login</title>
		</Head>

		<main>{children}</main>
	</>
)

export default DefaultLayout
