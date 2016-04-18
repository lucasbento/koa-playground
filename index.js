var app = require('koa')();
var session = require('koa-session');

app.keys = ['koa', 'secret', 'keys', 'for', 'sessions'];

app
	.use(session(app))
	.use(function* (next) {
		var views = this.session.views || 0;
		this.session.views = ++views;

		this.body = views + ' views';
	})
	.listen(process.argv[2] || 4000);