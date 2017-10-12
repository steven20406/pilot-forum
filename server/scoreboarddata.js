/**
 * Created by Steven 臧 on 2017/8/1.
 */
module.exports = scoreboard;

function scoreboard(callback) {
    var mongodb = require('mongodb');

    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/pilot_forum';

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Unable to connect to DB.", err);
            db.close();
        } else {
            console.log("Connection established.")

            var collection = db.collection('score_record');

            collection.find({}).toArray(function (err, result) {
                callback(result);
                db.close();
            })
        }

    })
}