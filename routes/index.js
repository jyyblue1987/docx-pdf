var express = require('express');
var router = express.Router();
const { exec } = require('child_process');

const fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});



router.get('/teacher', function(req, res, next) {
    fs.readFile('public/teacher.html', function(err, data) {                
        var str = data.toString();
   
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(str);
        res.end();
    });
});

router.get('/student-b', function(req, res, next) {
    fs.readFile('public/student.html', function(err, data) {                
        var str = data.toString();
   
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(str);
        res.end();
    });
});


router.get('/student-a', function(req, res, next) {
    fs.readFile('public/student.html', function(err, data) {                
        var str = data.toString();
   
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(str);
        res.end();
    });
});


router.get('/convertfile', function(req, res, next) {	
    var src_path = req.query.src_path;

    var file_name = path.basename(src_path);
    var ext = path.extname(src_path);

    var data = {code : 200};

    if( !ext )
    {
        data.code = 201;
        res.send(data);
    }

    var dest_path = src_path.substring(0, src_path.length - ext.length) + ".pdf";
    var dest_dir = src_path.substring(0, src_path.length - file_name.length);

    var command = `libreoffice6.4 --headless --outdir ${dest_dir} --convert-to pdf ${src_path}`;
    exec(command, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        var data = {code : 200};
        data.dest_path = dest_path;
        data.command = command;    
           
        if (error !== null) {
            data.code = 201;
            data.error = `exec error: ${error}`;   
            data.command = command;       
        } else {
            data.code = 200;
           
        }

        res.send(data);   
    });    
    
});


module.exports = router;
