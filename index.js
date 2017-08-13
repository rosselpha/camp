var express = require('express'),
    app = express(),
    port = process.env.PORT || 4001,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground.js'),
    seedDB =  require('./seeds')


seedDB();    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelpcamp", {
      useMongoClient: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs' );




app.get('/',(req,res) =>{
    res.render('home')
});

app.get('/campgrounds', (req,res)=>{
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err)
        }else{
            res.render('index', {campgrounds:allCampgrounds})
        }
    })
});

app.post('/campgrounds', (req, res)=>{  
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGrounds = {name:name, image:image, description:description}

    Campground.create(newCampGrounds, (err, newlyCreated)=>{
        if(err){
            console.log(err)
        }else{
             res.redirect('campgrounds');   
        }
    })
});

app.get('/campgrounds/new', (req,res)=>{
    res.render('new')
})

//show route to view 
app.get('/campgrounds/:id',(req,res)=>{

    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground)=>{
        if(err){
            console.log(err)
        }else{
            res.render('show', {campground: foundCampground})
        }
    })

    
})

app.listen(port, ()=>{
    console.log(`server has started on port ${port}`)
})