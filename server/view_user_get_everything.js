/**
 * Created by Steven 臧 on 2017/8/5.
 */
module.exports = view_user;

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/pilot_forum';

function view_user (id,callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Unable to connect to DB.", err);
            db.close();
        } else {
            console.log("Connection established.");

            var collection = db.collection('personal_profile');

            var o_id = new mongodb.ObjectID(id);

            collection.findOne({_id : o_id}, function (err, result) {
                var userprofile = result;
                collection = db.collection('post_content');
                collection.find({'user.email' : result.email}).toArray(function (err,result) {
                        callback({
                            userprofile : userprofile,
                            content : result
                        }
                        );
                        db.close();
                })
            });
        }
    })
}