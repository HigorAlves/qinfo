import React from 'react'

import DashboardLayout from './Dashboard'
import DefaultLayout from './Default'

const layouts = {
	default: DefaultLayout,
	dashboard: DashboardLayout
}

const LayoutWrapper = (props: any) => {
	// to get the text value of the assigned layout of each component
	const Layout =
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line react/prop-types
		layouts[props.children.props.layout || props.children.type.layout]

	// if we have a registered layout render children with said layout
	if (Layout != null) {
		return (
			// eslint-disable-next-line react/prop-types
			<Layout {...props}>{props.children}</Layout>
		)
	}

	// if not render children with fragment
	return (
		// eslint-disable-next-line react/prop-types
		<DefaultLayout {...props}>{props.children}</DefaultLayout>
	)
}

export default LayoutWrapper
