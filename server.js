require('dotenv').config();
const express = require('express');
const process = require('process');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json())

/*
do http://host.com/prolapse to get the image stuff
you can also change the "/prolapse" thing :flushed:
*/
app.get('/prolapse', (req, res) => {
  try {
    var result = getProlapse()
    var randomMessage = getRandomMessage()
    var fullUrl = req.protocol + '://' + req.get('host');
    res.send({
      status: true,
      message: randomMessage,
      url: path.join(`${fullUrl}/${result}`)
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: e.message
    })
  }
})

//using the dir /images as static
app.use(express.static('images'))

//function to get a random message (messages are inside the randomMessageArray)
function getRandomMessage() {
  try {
    var randomMessageArray = ['mmmmh la merde!', 'il ne faut surtout pas leur montrer!', 'oh putain, tu as vu mon trou?']
    var int = Math.floor(Math.random() * randomMessageArray.length)
    return randomMessageArray[int]
  } catch (e) {
    return e.message;
  }
}

var __dirname; //mmmmmmmh don't ask

//this code is kinda sh1t but it works, it send a random image that is inside the images dir
function getProlapse() {
  /*
  imagePrefix is the name of the image (for example, by default, it is dechet, and all my images are named "dechet0.png", "dechet1.png")
  the first image need to be 0 because the first number of the index is 0.
  */
  var imagePrefix = process.env.IMAGE || 'dechet'
  try {
    var totalFile = fs.readdirSync(path.join(__dirname, 'images')).length
    var int = Math.floor(Math.random() * totalFile)
    var imageName = imagePrefix + int.toString() + '.png'
    return imageName;
  } catch (e) {
    return e.message;
  }
}

const PORT = process.env.PORT || 3000
//app is listening to the PORT defined in the .env (by default 3000)
app.listen(PORT, () => console.log(`server on using port ${PORT}`))
