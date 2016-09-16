var express = require('express');
var app = express();
var multer  = require('multer');
//http://stackoverflow.com/questions/34697502/how-to-limit-the-file-size-when-uploading-with-multer

//var upload = multer(
//     {dest:'Nick/',              //this way the file gets saved to the app folder Nick
//    limits: { fileSize: 5242880 }});

var upload = multer({limits: { fileSize: 5242880 }});

var PORT = process.env.PORT || 3000;
var ans;

//https://github.com/expressjs/multer
//https://www.youtube.com/watch?v=2y9Nl04B2UA
http://stackoverflow.com/questions/31601103/trouble-uploading-a-file-express-node-multer
app.get('/',function(req,res){
res.sendFile((__dirname+'/index.html'));
});

//http://stackoverflow.com/questions/32350980/nodejs-express-redirect-after-post
app.post('/',upload.single('myfile'),function(req,res){  
    ans = req.file;
    res.send('<html><body></body><script type="text/javascript">window.location.href="/filesize";</script></html>');
});

app.get('/filesize',function(req,res){
    ans = ans.size;
    res.send({"size":ans});
});

app.use(function(err, req, res, next) {
  res.status(500).send('The file you are trying to upload has a filesize more than 5mb');
});


app.listen(PORT, function(){
    console.log('Express listening on port '+ PORT + '!');
});