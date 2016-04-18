var app = require('koa')();
var views = require('co-views');

var render = views(__dirname + '/views', {
	ext: 'ejs'
});

app.keys = ['koa', 'secret', 'keys', 'for', 'sessions'];

app
	.use(function* (next) {
		var user = {
			name: {
				first: 'Tobi',
				last: 'Holowaychuk'
			},
			species: 'ferret',
			age: 3
		}

		this.body = yield render('user', { user: user });
	})
	.listen(process.argv[2] || 4000);