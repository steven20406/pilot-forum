//app.js
//main
var express = require('express');
var http = require('http');
var path = require('path');
var session = require('express-session');
var io = require('socket.io');

var app = express();

app.use(express.static(path.join(__dirname,'../pilot forum')));
app.use(require('body-parser')());
app.use(session({secret: 'non'}));

var server = http.createServer(app);

io = io.listen(server);

server.listen(4000);

var clients = [];
io.sockets.on('connection',function(socket){
    var name;
    socket.on('broadcast_connect',function (data) {
        clients.push(data);
        name = data;
        io.sockets.emit('show_everyone',
            {clients : clients, data : data}
            );
    });
    socket.on('message',function(data){
        socket.broadcast.emit('messageServer',data);
    });
    socket.on('disconnect',function(){
        clients.splice(clients.indexOf(name),1);
        socket.broadcast.emit('offline',
            {clients : clients, name : name}
            );
    });
});

app.post('/login', function (req, res) {
    var login = require('./login');
    var email = req.body.email;
    var password = req.body.password;

    login(email,password,function (result) {
        req.session.userprofile = result.userprofile;
        var loginResult = {result : result.statement};
        res.send(loginResult);
    })
});

app.post('/logout',function (req,res) {
    req.session.destroy(function () {
        res.send('logout');
    })
});

app.post('/checkSession',function (req,res) {
    var session = req.session;
    if(session.userprofile==null){
        res.end('notValid');
    }
});

app.post('/register',function (req,res) {
    var registration = require('./registration');

    registration.registration(req.body,function (result) {
        if(result=='Account already exist!'){
            res.send({result:'exist'});
        }
        else{
            res.send({result:'success'});
        }
    })
});

app.post('/scoreboard',function (req, res) {
    var scoreboard = require('./scoreboarddata');
    scoreboard(function (result) {
        res.send(result);
    })
});

app.post('/getuser',function (req,res) {
    var user = req.session.userprofile;
    res.send(user);
});

app.post('/getusercontent',function (req,res) {
    var getusercontent = require('./addcontent_addcomment');
    var email  = req.session.userprofile[0].email;
    getusercontent.getusercontent(email, function (result) {
        res.send(result);
    })
});

app.post('/addcontent',function (req,res) {
    var addcontent = require('./addcontent_addcomment');
   var session = req.session.userprofile[0];
   var subject = req.body.subject;
   var contenttext = req.body.contenttext;
   var yeardate = req.body.yeardate;

   addcontent.addcontent(subject,contenttext,session,yeardate,function (result) {
       res.send(result);
   })
});

app.post('/addcomment',function (req,res) {
    var contentid = req.body.contentid;
    var text = req.body.text;
    var yeardate = req.body.yeardate;
    var user = req.session.userprofile;
    var addcomment = require('./addcontent_addcomment');

    var comment_data = {
        user : user[0],
        comment_text : text,
        yeardate : yeardate
    };
    addcomment.addcomment(contentid,comment_data,function (result) {
        if(result==null){
            res.send({reesult : 'false'});
        }
        else{
            res.send({reesult : 'success'});
        }
    })
});

app.post('/getcontent',function (req,res) {
    var getcontent = require('./addcontent_addcomment');
    getcontent.getallcontent(function (result) {
        res.send(result);
    })
});

app.post('/getspecificcontent',function (req,res) {
    var id = req.body.id;
    var getsepcificcontent = require('./addcontent_addcomment');
    getsepcificcontent.getspecificontent(id,function (result) {
        res.send(result);
    })
});

app.post('/view_user',function (req,res) {
    var view_user = require('./view_user_get_everything');
    var id = req.body.id;
    view_user(id,function (result) {
        res.send(result);
    });
});

app.post('/search_user',function (req,res) {
    var text = req.body.search_user_text;
    var search_user = require('./search_user');
    search_user(text,function (result) {
        res.send(result);
    });
});

app.post('/check_email',function (req,res) {
    var email = req.body.email;
    var check_account = require('./change_password');
    check_account.check_account(email,function (result) {
        if(result==null){
            res.send({
                status : 'not_exist'
            })
        }
        else{
            res.send({
                status : 'success'
            })
        }
    })
});

app.post('/change_password',function (req,res) {
    var email = req.body.email;
    var password = req.body.password;
    var change_password = require('./change_password');
    change_password.changre_password(email,password,function (result) {
        if(result=='success'){
            res.send({status : 'success'});
        }
    })
});

app.post('/get_user_twit',function (req,res)  {
    var twitter_name = req.body.twitter_name;
    var user_twit = require('./twitter');

    user_twit.get_user_twit(twitter_name,function (result) {
        res.send(result);
    })
});

app.post('/edit_personal_profile',function (req,res) {
   var data = req.body;
    var registration = require('./registration');
    registration.edit_persoanl_profile(data,function (result) {
        if(result){
            req.session.userprofile = result;
            res.send(result);
        }
    })
});

app.post('/add_score_data',function (req,res) {
    var score = parseInt(req.body.score);
    var yeardate = req.body.yeardate;
    var user = req.session.userprofile[0];
    var data={
        score : score,
        user : user,
        yeardate : yeardate
    };
    var add_score = require('./addcontent_addcomment');
    add_score.add_score(data,function (result) {
        if(result){
            res.send({state : 'success'});
        }
    })

});