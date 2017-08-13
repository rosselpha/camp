var mongoose = require('mongoose'),
    Campground = require('./models/campground');
var Comment = require("./models/comment");

data =[
    {
        name:'nollan',
        image: "https://cdn.pixabay.com/photo/2017/05/12/15/03/labadee-2307315__340.jpg",
        description: 'how to win a free vacation'
    },
    {
        name: "bad bitches",
        image: 'https://cdn.pixabay.com/photo/2017/07/10/21/18/beautiful-woman-2491602__340.jpg',
        description: 'hot'
    }
]



function seedDB(){
    Campground.remove({}, (err)=>{
        if(err){
            console.log(err)
        }
        console.log('remove all campground')

        
        //ADD CAMPGROUNDS
        data.forEach(function(seed) {
            Campground.create(seed,(err, campground)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('added campground')
                    
                    //create a comment
                    Comment.create({text: 'this place is great', author: 'hommer'}, (err, comment)=>{
                       if(err){
                           console.log(err)
                       }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('created new comments')
                       }
                    })
                }
            })        
        });

    })

    //ADD COMMENTS
}

module.exports = seedDB;
