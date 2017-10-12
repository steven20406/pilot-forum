/**
 * Created by Steven 臧 on 2017/8/7.
 */
var Twit = require('twit')

var T = new Twit({
    consumer_key: 'HgUMO7vQ0g4QKZWmXKbNLrbVM',
    consumer_secret: 'NRoayflhYCfSpD3vH2gEyNnXiRDp115OsvpcJ0Zsv6ZZtSfmDv',
    access_token: '856183080717103104-RoiTQubl1hLj7fpAphfv4UUTOWimmJQ',
    access_token_secret: '4xdFlACzW6OkaSDvsUYoPOXaxsn2aAUF5XsFFnOSRbSuN'
});

module.exports = {
    get_user_twit : function (user,callback) {
        var searchUser = "from:"+user;
        var result = [];
        var parameter = {
            q : searchUser,
            count : 10
        };
        T.get('search/tweets', parameter, function (err, data, response) {
            for (var indx in data.statuses) {
                var tweet = data.statuses[indx];
                var temp = result;
                result = temp.concat(tweet);
            }
            callback(result);
        });
    }
};