/**
 * Created by Steven 臧 on 2017/8/5.
 */
$(document).ready(function () {
    $('#chat_show').append("<p>Join the chat room!</p>");
    var socket = io.connect();

    var clients = [];

    $.post('getuser', function (user) {
        var user = {
            name: user[0].screenname,
            userid: user[0]._id
        };
        socket.emit('broadcast_connect', user);
    });

    $('#chat_submit').click(function () {
        $.post('getuser', function (user) {
            console.log(user[0].screenname);
            var message = $('#chat_text').val();

            $('#chat_show').append("<p><a href='view_user.html?id="+user[0]._id+"'>" + user[0].screenname + "</a> : " + message + "</p>");
            $('#chat_text').val('');

            $('#chat_show').scrollTop($('#chat_show').height());

            socket.emit('message', {
                name: user[0].screenname,
                message: message,
                userid: user[0]._id
            });
        });
    });


    socket.on('messageServer', function (data) {
        $('#chat_show').append("<p><a href='view_user.html?id=" + data.userid + "'>" + data.name + "</a>:" + data.message + "</p>");
    });

    socket.on('show_everyone', function (data) {
        console.log("someone connect");
        clients = data.clients;
        var user = data.data;
        $("#chat_show").append("<p><a href='view_user.html?id=" + user.userid + "'>" + user.name + "</a> just connect!</p>");
        refresh_online();
    });

    socket.on('offline', function (data) {
        var user = data.name;
        clients = data.clients;
        $("#chat_show").append("<p><a href='view_user.html?id='" + user.userid + ">" + user.name + "</a> disconnected</p>");
        refresh_online()
    });

    function refresh_online() {
        $('#online_member').html("");
        for (var index in clients) {
            $('#online_member').append("<tr>" +
                "<td><a href='view_user.html?id=" + clients[index].userid + "'>" + clients[index].name + "</a></td>" +
                "</tr>"
            );
        }

    }
});