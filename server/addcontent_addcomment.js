/**
 * Created by Steven 臧 on 2017/8/3.
 */
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/pilot_forum';
module.exports = {

    addcontent: function (subject, text, user, yeardate,callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('post_content');

                var data = {
                    user: user,
                    subject: subject,
                    text: text,
                    yeardate :yeardate,
                    comment: []
                };
                collection.insert(data, function (err, result) {
                    callback(result);
                    db.close();
                });

            }
        })
    },

    addcomment: function (contentid, comment_data, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('post_content');

                var o_id = new mongodb.ObjectID(contentid);

                collection.update({_id : o_id}, {$push : { comment : comment_data}},function (err, result) {
                    callback(result);
                    db.close();
                });
            }
        })
    },

    getallcontent : function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('post_content');

                collection.find({}).toArray(function (err, result) {
                    callback(result);
                    db.close();
                });

            }
        })
    },

    getusercontent : function (email,callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('post_content');

                collection.find({'user.email' : email}).toArray(function (err, result) {
                    callback(result);
                    db.close();
                });

            }
        })
    },

    getspecificontent : function (id,callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('post_content');

                var o_id = new mongodb.ObjectID(id);

                collection.findOne({_id: o_id},function (err, result) {
                    callback(result);
                    db.close();
                });
            }
        })
    },

    add_score : function (data,callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Unable to connect to DB.", err);
                db.close();
            } else {
                console.log("Connection established.");

                var collection = db.collection('score_record');
                collection.insert(data, function (err, result) {
                    callback(result);
                    db.close();
                });
            }
        })
    }

};