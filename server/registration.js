/**
 * Created by Steven 臧 on 2017/8/1.
 */
var hash = require('md5-hex');

module.exports = {

    registration: function (data, callback) {
        var mongodb = require('mongodb');

        var MongoClient = mongodb.MongoClient;

        var url = 'mongodb://localhost:27017/pilot_forum';

        //MD5 Password
        data.password = hash(String(data.password));

        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('personal_profile');

                collection.find({email: data.email}).toArray(function (err, result) {
                    if (result.length != 0) {
                        callback('Account already exist!');
                        db.close();
                    }
                    else {
                        collection.insert(data, function (err, result) {
                            callback("success");
                            db.close();
                        });
                    }
                })
            }
        });
    },

    edit_persoanl_profile : function (data, callback) {
        var mongodb = require('mongodb');

        var MongoClient = mongodb.MongoClient;

        var url = 'mongodb://localhost:27017/pilot_forum';

        if(data.password.state=="empty"){
            data.password=data.password.password;
        }
        else {
            data.password=hash(String(data.password.password));
        }

        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.")

                var collection = db.collection('personal_profile');

                collection.update({email: data.email}, {$set :{twitter_username : data.twitter_username, twitch_id : data.twitch_id, password : data.password}}, function (err, result) {
                    if(result) {
                        collection.find({email:data.email}).toArray(function (err,user_profile) {
                            callback(user_profile);
                        });
                        db.close();
                    }
                })
            }
        });
    }
};