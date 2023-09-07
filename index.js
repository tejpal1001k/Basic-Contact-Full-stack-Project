const express = require("express");

const path = require("path"); //this is for the path

const port = 8000;
const Contact = require('./models/contact');
const db = require('./config/mongoose');
const app = express();
app.set("view engine", "ejs"); //seting view engine for the express as here we are using ejs
app.set("views", path.join(__dirname, "views")); //here we are joining the path form directory name and views
app.use(express.urlencoded()); //this is middleware


app.use(express.static('assets')); // here we are linking static files to index.js

// app.use(function(req, res, next){
//     console.log("hey I am from middleware 1");
//     next();
// });



var contactlist = [
  {
    name: "Dhruva",
    phone: "1234567890"
  },
  {
    name: "Mahi",
    phone: "1234567890"
  },
  {
    name: "Rudra",
    phone: "1234567890"
  },
  {
    name: "Montu",
    phone: "1234567890"
  },
  {
    name: "Rajesh",
    phone: "1234567890"
  },
  {
    name: "Mahadev",
    phone: "1234567890"
  },
];

app.get("/", function (req, res) {
  Contact.find({}, function(err, contacts){
    if(err){
      console.log('error in fatching data from database');
      return;
    }
    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  });
  // return res.render("home", {
  //   title: "Contact List",
  //   contact_list: contactlist,
  // });
  // res.send('<h1> Hey Cool I am running</h1>');
});
app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Play with us",
  });
});

//accepting the data form form and redirect to practice page
app.post("/create_contact", function (req, res) {
    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // console.log(req.body);
    // contactlist.push(req.body)
    Contact.create({
      name:req.body.name,
      phone:req.body.phone
    }, function(err, newContact){
      if(err){
        console.log('err in creating contact');
        return;
      }
      console.log("************", newContact);
      return res.redirect('back');

    })
    // return res.redirect('/')
    // return res.redirect('back')
//   return res.redirect("practice");
});



app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    // let phone = req.query.phone
    // req the id form url to delete the contact
  let id = req.query.id;
  // find the id in database and delete it

  Contact.findByIdAndDelete(id, function(err){
    if(err){
      console.log('getting error in deleting an object from database');
      return;
    }

  });
    // let contactindex = contactlist.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactlist.splice(contactindex, 1);
    // }

    return res.redirect('back');
});



app.listen(port, function (err) {
  if (err) {
    console.log("Error");
  }
  console.log("Hey! Server is running fine on port number :", port);
});
