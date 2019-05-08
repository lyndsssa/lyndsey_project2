//console.log('this is a test')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Floaties = require('./models/store.js');
const products = require('./models/products.js');

//const methodOverride = require('method-override');
//console.log(Floaties)
////connect to mongoose///
mongoose.connect('mongodb://localhost:27017/floatStore', {useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
  console.log('connected to mongo');
});

//////////for heruko//////
// app.get('/', (req, res) => {
//   res.redirect('/brands')
// });

//////////////////////////////////////
///////////////.use////////////////////
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
//app.use(methodOverride('_method'));

///////////////////////////////////
/////////////NEW ROUTE////////////
app.get('/store/new', (req, res)=>{
  res.render('new.ejs');
});

///////////////////////////////////////
////////////CREATE ROUTE//////////////
app.post('/store/', (req, res)=>{
  if(req.body.addToCart === 'on'){
    req.body.addToCart = true;
  } else {
    req.body.addToCart = false;
  }
  res.redirect('/store/edit');

});

///////////////////////////////////////
/////////////////SHOW ROUTE////////////
app.get('/store/show/:id', (req, res)=>{
  Floaties.findById(req.params.id, (error, allFloats) =>{
    res.render('show.ejs', {
      allProducts: allFloats
    });
  })
});
///////////////////////////////////////
/////////////////SHOW ROUTE////////////
// app.get('/store/show', (req, res)=>{
//   res.render('show.ejs');{
//
//   }
// });

///////////////////////////////////////
///////////////INDEX ROUTE/////////////
app.get('/store/', (req, res)=>{
  Floaties.find({}, (error, allFloats)=>{
    console.log(allFloats)
    res.render('index.ejs',{
      allProducts: allFloats
    });
  })
});


////////////////////////////////////////
/////////////////EDIT ROUTE////////////
app.get('/store/edit', (req, res)=>{
  res.render('edit.ejs');
});

////////////////////CART.ejs ROUTE/////////////////
app.get('/store/blog', (req, res)=>{
  res.render('blog.ejs');
});

//////////////ADD to CART///////////////////////
// app.get('/store/edit', (req, res)=>{
//   Floaties.update(req.param, (error, allFloats)
//   res.render('edit.ejs');
// })

///////////////////////////////////////
//////////////SEED ROUTE///////////////
app.get('/seed/', (req, res)=>{
  Floaties.create(products, (error, createdProducts)=>{
console.log(error)
      res.send('')})

});

////port//////
app.listen(3000, ()=>{
  console.log("I am listening");
});
