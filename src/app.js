const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/product.router.js');
const viewsRouter = require('./routes/views.router.js')
const passport = require('passport')
const startPassport = require('./config/passport.config.js');
const sessionRouter = require('./routes/sessions.router.js');



//--------login----------
const cartsRouter = require('./routes/carts.router.js')
const authRouter = require('./routes/auth.router.js');
const session = require('express-session')
const MongoStore = require('connect-mongo');
//*************************

const myModules = require('./utils/utils.js')
const path = require('path');
const app = express();
const port = 8080;

// --------CONNECT TO MONGO--------

myModules.mongo()

// --------HANDLEBARS--------
app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --------RUTAS--------

//*MONGOCOOKIES*
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://ezeszulz:test@coder.phqbv0m.mongodb.net/E-commerce?retryWrites=true&w=majority', ttl: 7200 }),
  secret: 'SECRETO',
  resave: true,
  saveUninitialized: true
}));
//*fin cookies*

//*PASSPORT*
startPassport();
app.use(passport.initialize())
app.use(passport.session())

//*fin passport*

app.get('/session', (req, res) => {
  res.send(req.session)
})

app.use('/api/sessions', sessionRouter);
app.use('/api/products', productsRouter);
app.use('/products', viewsRouter);
app.use('/carts', cartsRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
