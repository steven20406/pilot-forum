/**
 * Created by Steven 臧 on 2017/8/13.
 */
$(document).ready(function () {
    $.post("getuser", function (data) {
        var user = data[0];
        $('#userdata').append("<tr>" +
            "<td class='tabledata'>User</td>" +
            "<td class='tabledata'>" + user.title + user.surname + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class='tabledata'>Screen name</td>" +
            "<td class='tabledata'>" + user.screenname + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class='tabledata'>E-mail</td>" +
            "<td class='tabledata'>" + user.email + "</td>" +
            "</tr>" +
            "<tr>"
        );

        if (user.twitter_username == 'None') {
            $('#userdata').append(
                "<tr>" +
                "<td class='tabledata'>Twitter</td>" +
                "<td class='tabledata'>" + user.twitter_username + "</td>" +
                "</tr>"
            )
        }
        else {
            $('#userdata').append(
                "<tr>" +
                "<td class='tabledata'>Twitter</td>" +
                "<td class='tabledata'><a href='https://twitter.com/" + user.twitter_username + "'>@" + user.twitter_username + "</a>" + "</td>" +
                "</tr>"
            )
        }

        if (user.twitch_id == 'None') {
            $('#userdata').append(
                "<tr>" +
                "<td class='tabledata'>Twitch</td>" +
                "<td class='tabledata'>" + user.twitch_id + "</td>" +
                "</tr>"
            );

            $('#twitch-embed').html("<p style='text-align: center'>No Twitch account connected!</p>");
        }
        else {

            $('#userdata').append(
                "<tr>" +
                "<td class='tabledata'>Twitch</td>" +
                "<td class='tabledata'><a href='https://www.twitch.tv/" + user.twitch_id + "'>" + user.twitch_id + "</a>" + "</td>" +
                "</tr>"
            );

            new Twitch.Embed("twitch-embed", {
                width: 1264,
                height: 900,
                channel: user.twitch_id,
                autoplay: false,
                layout: 'video',
                muted: true
            });
        }

        var twitter_name = user.twitter_username;
        $.ajax({
            url: '/get_user_twit',
            type: 'post',
            data: {
                twitter_name: twitter_name
            },
            dataType: 'json',
            success: function (resp) {
                if (resp.length == 0) {
                    $('#Twit').html("<p style='text-align: center'>No tweet!</p>")
                }
                else {
                    for (var index in resp) {
                        $('#twitarea').append("<tr>" +
                            "<td><img src='" + resp[index].user.profile_image_url + "'></td>" +
                            "<td class='tabledata'><a href='https://twitter.com/" + twitter_name + "/status/" + resp[index].id_str + "'>" + resp[index].text + "</a></td>" +
                            "<td class='tabledata'>" + resp[index].created_at.substr(4, 6) + "</td>" +
                            "</tr>"
                        )
                    }
                }
            }
        })
    });
});

$(document).ready(function () {
    $.post("getusercontent", function (data) {
        if (data.length == 0) {
            $('#contentheader').html("<p style='text-align: center; font-size: x-large; font-family: Times New Roman'>No post content.</p>");
        }
        else {
            var count = data.length;
            for (var index in data) {
                var number = count - index - 1;

                $('#contentarea').append("<tr>" +
                    "<td><a href='specific_content.html?id=" + data[number]._id + "'>" + data[number].subject + "</a></td>" +
                    "<td class='tabledata'>" + data[number].comment.length + "</td>" +
                    "<td class='tabledata'>" + data[number].yeardate + "</td>" +
                    "</tr>"
                );
            }
        }
    })
});

$(document).ready(function () {
    $('#twitch_streaming_toggle').click(function () {
        $('#postcontent').fadeToggle(0);
        $('#twitch_area').fadeToggle(0);
    });
});