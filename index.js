var app = require('koa')();
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var views = require('co-views');
var render = views(__dirname + '/views', {
	ext: 'ejs'
});

app.keys = ['secret', 'secure', 'keys'];

app
	.use(session(app))
	.use(bodyParser())
	.use(function* home(next) {
		if (this.request.path !== '/')
			return yield next;

		if (this.session.loggedIn) {
			this.status = 200;
			return this.body = 'hello world';
		}

		this.status = 401;
	})
	.use(function* login(next) {
		if (this.request.path !== '/login')
			return yield next;

		if (this.request.method === 'GET')
			return render('form');

		if (this.request.body.username === 'username' && this.request.body.password === 'password') {
			this.session.loggedIn = true;
			return this.redirect('/');
		}

		this.status = 400;
	})
	.use(function* logout(next) {
		if (this.request.path !== '/logout')
			return yield next;

		this.session.loggedIn = false;
		this.redirect('/login');
	})
	.listen(process.argv[2] || 4000);