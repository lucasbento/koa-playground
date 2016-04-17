var app = require('koa')();

// app.keys = ['koa', 'secret', 'keys', 'for', 'signed', 'cookies'];

app
	.use(function* (next) {
		var view = 
		(this.cookies.get('view', ['signed'])) ? this.cookies.get('view', ['signed']) : 0;

		view++;

		this.cookies.set('view', view, ['signed']);
		yield next;

		this.body = view + ' views';
	})
	.listen(process.argv[2] || 4000);