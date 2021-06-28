import React from 'react'

import ServerCookie from 'next-cookies'

import { TOKEN_STORAGE_KEY } from '~/utils/authToken'
import redirect from '~/utils/redirect'

const PrivatePage = (C: any) => {
	return (layout: 'dashboard') => {
		return class AuthComponent extends React.Component {
			static async getInitialProps(ctx: any) {
				try {
					const token = ServerCookie(ctx)[TOKEN_STORAGE_KEY]

					if (!token) {
						await redirect(ctx, '/login')
						return {
							isValidToken: false
						}
					}

					// const isValidToken = await verifyToken(token)
					const isValidToken = true

					if (!isValidToken) {
						await redirect(ctx, '/login')
						return {
							isValidToken: isValidToken
						}
					}
					return {
						isValidToken: isValidToken,
						layout: layout
					}
				} catch (error) {
					await redirect(ctx, '/login')
					return {}
				}
			}

			render() {
				return <C {...this.props} />
			}
		}
	}
}

export default PrivatePage
