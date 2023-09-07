// require the library
const mongoose = require('mongoose');


//connect to  database
// mongoose.connect('mongodb://localhost/contacts_list_db');
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db', { useNewUrlParser: true });


//aquire the connection(to check) 
const db = mongoose.connection;

//error if not connected succesfully
db.on('error' , console.error.bind(console, 'error connecting to db'));

//msg for succesfully connection
db.once('open', function(){
    console.log('connected succesfully to database'); 
});
