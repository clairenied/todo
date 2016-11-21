const express = require('express')
const app = express()

const routes = require('./routes')
const models = require('./models')

const bodyParser = require('body-parser')
const Promise = require('bluebird')
const morgan = require('morgan')
const chalk = require('chalk')
const nunjucks = require('nunjucks')

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use('/stylesheets', express.static('public/stylesheets'))

models.todoDb.sync({
	force: true
})
.then(function(){
	app.listen(3000, function () {
      console.log(chalk.magenta('Claire and the Server are Listening on Port 3000'));
  });
})
.catch(console.error)

app.use('/', routes)

app.use(function (err, req, res, next) {
	console.error(err)
  res.status(err.status || 500).send(err.message);
});