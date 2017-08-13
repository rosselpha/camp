var mongoose = require('mongoose');



//shema
var campgroundsShema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            rel: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Campground', campgroundsShema);