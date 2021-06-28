import Router from 'next/router'

const Redirect = async (context: any, target: string) => {
	if (context.res) {
		context.res.writeHead(303, { Location: target })
		context.res.end()
	} else {
		// In the browser, we just pretend like this never even happened ;)
		await Router.replace(target)
	}
}
export default Redirect
