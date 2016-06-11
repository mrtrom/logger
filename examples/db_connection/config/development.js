module.exports = {
	db: {
		logger: "mongodb://localhost/logger",
		options: {
			db: {
				safe: true
			},
			server: {
				socketOptions: {
					keepAlive: 300000,
					connectTimeoutMS: 30000
				}
			}
		}
	}
};