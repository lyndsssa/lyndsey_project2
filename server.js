//console.log('this is a test')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Floaties = require('./models/store.js');
const Blog = require('./models/blog.js');
const Order = require('./models/orderForm.js');
const products = require('./models/products.js');

const methodOverride = require('method-override');

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
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

///////////////////////////////////
/////////////NEW ROUTE////////////
app.get('/store/new', (req, res)=>{
  Order.find({},(err, newOrder) => {
  res.render('new.ejs', {
    newOrders:newOrder
  })
});
});

// app.use((req,res, next)=>{
//   console.log('I run new routes');
//   next();
// });

app.post('/store/new', (req, res)=>{
  console.log("store new post route hit")
  if(req.body.newFloat === 'on'){
    req.body.newFloat = true;
  } else {
    req.body.newFloat = false;
  }
  Order.create(req.body, (err, newOrder)=>{
    console.log(newOrder)
    res.redirect('/store/blog/yourOrder');
  });

  //console.log(Floaties);
//   res.send('data recieved');
 });
///////////////////////////////////////
////////////CREATE ROUTE//////////////
app.get('/store/blog', (req, res)=>{
    Blog.find({},(err, newBlog) => {
    res.render('blog.ejs', {
      newPost:newBlog
    })
  });
});

// app.use((req,res, next)=>{
//   console.log('middlewear');
//   next();
// });

app.post('/store/blog', (req, res)=>{
  console.log("inside store route")
  if(req.body.addToBlog === 'on'){
    req.body.addToBlog = true;
  } else {
    req.body.addToBlog = true;
  }
  Blog.create(req.body, ()=>{
    console.log(req.body)
  res.redirect('/store/blog');
})
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
app.get('/store/yourOrder/:id/edit', (req, res)=>{
  Order.findById(req.params.id, (err, orders) => {
    console.log(orders)
  res.render(
    'edit.ejs', {
      //newOrders: orders[req.params.id]
    })
  });
});

////////////////////Blog ROUTE/////////////////
app.get('/store/blog', (req, res)=>{
  res.render('blog.ejs');
});

//////////////////ORDER ROUTE///////////////
app.get('/store/blog/yourOrder', (req, res)=>{
  Order.find({},(err, newOrder) => {
    console.log(newOrder)
  res.render('yourOrder.ejs', {

    newOrders:newOrder

  });
})
});
app.post('/store/blog/yourOrder', (req, res)=>{
  console.log("your order recieved")
  if(req.body.newFloat === 'on'){
    req.body.newFloat = true;
  } else {
    req.body.newFloat = false;
  }
  Order.create(req.body, ()=>{
    console.log(req.body)
  res.redirect('/store/blog/yourOrder');
})

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
