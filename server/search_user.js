/**
 * Created by Steven 臧 on 2017/8/6.
 */
module.exports = search_user;

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/pilot_forum';

function search_user(text,callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Unable to connect to DB.", err);
            db.close();
        } else {
            console.log("Connection established.")

            var collection = db.collection('personal_profile');

            collection.find({screenname: {$regex : text}}).toArray(function (err, result) {
                callback(result);
                db.close();
            })
        }
    });

}