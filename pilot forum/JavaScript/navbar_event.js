/**
 * Created by Steven 臧 on 2017/8/4.
 */
$(document).ready(function () {
    $.post("checkSession", function (data) {
        if (data === 'notValid') {
            window.location.href = "/index.html";
        }
    });

    $('#usertoggle').click(function () {
        $('.show_user_proifle').fadeToggle(500);
    });

    $('#logoutforum').click(function () {
        $.post('logout', function (data) {
            alert('Log out successful!');
            window.location.href = "/index.html";
        })
    });

    $('#search_user').click(function () {
        var search_text = $('#search_text').val();
        window.location.href = "/search_user.html?search="+search_text;
    });

    $.post("getuser", function (data) {
        $('.userprofile').append(
            "<p>User : <a href='../personal_profile.html'>" + data[0].title + " " + data[0].surname + "</a></p>" +
            "<p>Screen Name : " + data[0].screenname + "</p>" +
            "<p>E-mail : " + data[0].email + "</p>");
        if(data[0].twitter_username=='None'){$('.userprofile').append(
            "<p>Twitter : "+data[0].twitter_username+"</p>"
        )
        }
        else{$('.userprofile').append(
            "<p>Twitter : <a href='https://twitter.com/" + data[0].twitter_username + "'>@"+data[0].twitter_username+"</a></p>"
        )
        }
    })
});