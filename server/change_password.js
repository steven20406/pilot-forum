/**
 * Created by Steven 臧 on 2017/8/7.
 */

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/pilot_forum';

var hash = require('md5-hex');

module.exports = {
    check_account: function (email, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('personal_profile');

                collection.findOne({email: email}, function (err, resulu) {
                callback(resulu);
                db.close();
                })
            }
        });
    },

    changre_password : function (email, password, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('personal_profile');

                var hash_password = hash(String(password));

                collection.update({email: email}, {$set :{password : hash_password}}, function (err, result) {
                    if(result) {
                        callback('success');
                        db.close();
                    }
                })
            }
        });
    }
}