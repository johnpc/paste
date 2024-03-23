/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SECRET_KEY: process.env.SECRET_KEY,
		BASE_URL: process.env.BASE_URL,
	  },
}

module.exports = nextConfig
