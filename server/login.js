/**
 * Created by Steven 臧 on 2017/7/30.
 */
module.exports = login;

var hash = require('md5-hex');

function login(email, password, callback) {
    var mongodb = require('mongodb');

    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/pilot_forum';

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Unable to connect to DB.", err);
            db.close();
        } else {
            console.log("Connection established.");

            var collection = db.collection('personal_profile');
            collection.find({email: email}).toArray(function (err, result) {
                if (err) {
                    console.log("Error");
                    db.close();
                } else if (result) {

                    if (result.length == 0) {
                        callback({
                                statement: 'Account not exist',
                                userprofile: result
                            }
                        );
                        db.close();
                    }
                    else {
                        var temp = hash(String(password));
                        if (temp != result[0].password) {
                            callback({
                                statement: 'Wrong password',
                                userprofile: result
                            });
                            db.close();
                        }
                        else {
                            callback({
                                statement: 'success',
                                userprofile: result
                            });
                            db.close();
                        }
                    }
                } else {
                    console.log("No documents found.");
                    db.close();
                }
            })
        }
    })
}