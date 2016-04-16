var app = require('koa')();

app
	.use(responseTime())
	.use(upperCase())
	.use(function* () {
		this.body = 'hello koa';
	})
	.listen(process.argv[2] || 4000);

function responseTime() {
	return function* (next) {
		var start = Date.now();

    yield next;

		this.set('X-Response-Time', Date.now() - start + 'ms');
	};
}

function upperCase() {
	return function* (next) {
		yield next;

		this.body = this.body.toUpperCase();
	};
}