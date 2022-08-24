const bodyParser = require("body-parser");
const cors = require("cors");
const exp = require("express");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtDecode = require("jwt-decode");
// const { parse, stringify } = require('flatted');
dotenv.config();
const app = exp();
const sequelize = require("./root");
const index = require("./models/index");
// const index.Users = require("./models/users");
// // const index.Comments = require("./models/comments");
// const index.posts = require("./models/posts");
// const index.CommentActions = require("./models/commentactions");
// const index.PostActions = require("./models/postactions");
// const index.ReplyActions = require("./models/replyactions");
// const index.Replies = require("./models/replies");
// const index.SavedPOsts = require("./models/savedposts");
// const index.CommentReplies = require("./models/commentreplies");
// const process = require("./jwt.env");
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://104.142.122.231",
    ],
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(function(req, res, next) {
//     res.header('Content-Type', 'application/json;charset=UTF-8')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     next()
//   })
// index.Users.hasMany(index.posts);
// index.posts.belongsTo(index.Users);
// index.Users.hasMany(index.Comments);
// index.posts.hasMany(index.Comments);
// index.Comments.belongsTo(index.posts);
// index.Users.hasMany(index.SavedPOsts);
// index.SavedPOsts.belongsTo(index.Users);
// index.posts.hasMany(index.SavedPOsts);
// index.SavedPOsts.belongsTo(index.posts);
// index.posts.hasMany(index.PostActions);
// index.Users.hasMany(index.PostActions);
// index.PostActions.belongsTo(index.Users);
// index.Users.hasMany(index.CommentActions);
// index.CommentActions.belongsTo(index.Users);
// index.Users.hasMany(index.ReplyActions);
// index.ReplyActions.belongsTo(index.Users);
// index.PostActions.belongsTo(index.posts);
// index.Comments.hasMany(index.CommentActions);
// index.CommentActions.belongsTo(index.Comments);
// index.Replies.hasMany(index.ReplyActions);
// index.ReplyActions.belongsTo(index.Replies);
// index.Comments.hasMany(index.CommentReplies);
// index.CommentReplies.belongsTo(index.Comments);
// index.Replies.hasOne(index.CommentReplies);
// index.CommentReplies.belongsTo(index.Replies);
sequelize.sync();
// const conn = mysql.createConnection({
//     host: 'localhost',
//     password: '',
//     user: 'root',
//     database: 'Blog'
// });
// conn.connect((err) => {console.log("err")});
app.post('/signUp', (req, res) => {
    console.log(req.body);
    let data = { userName: req.body.uName, mailId: req.body.mid, contactNo: req.body.cno, password: req.body.pass };
    console.log("sign");
    index.Users.findAll({attributes: ['id','userName','mailId'], where: { mailId: req.body.mid } }).
        then(result => {
            console.log("sign");
            console.log(data);
            console.log(result);
            let status = result.length > 0 ? false : true;
            if (status) {
                index.Users.create(data).
                    then((result) => {
                        console.log(result.id);
                        let jwtKey = '2de778eeb26d0f50756a8a8be12ae8bead2fa79d93dfebed39fc87570f4e1633bb65571dea5246af1df179ed0186badc894d4e4fbf799b84d41a9eb722f9f8ae';
                        // console.log(jwtKey);
                        let token = jwt.sign({ mailId: req.body.mid, userId: result.id }, jwtKey);
                        res.header('Access-Control-Allow-Credentials', true);
                        res.cookie("token", token, { maxAge: 9000000000, httpOnly: false })
                        res.send(JSON.stringify({ status: status, token: token }));
                    })
            }
            else {
                res.send(JSON.stringify({ status: status, msg: "User with this mailId already exists!" }))
            }
        })
})
app.post('/logIn', (req, res) => {
    console.log(req.body);
    let data = {mailId: req.body.mid, password: req.body.pass };
    console.log("sign");
    index.Users.findOne({attributes: ['id','userName','mailId'],where: data }).
        then(result => {
            console.log("sign");
            console.log(data);
            console.log(result);
            let status = result ? true : false;
            if (status) {
                // index.Users.create(data).
                //     then((result) => {
                        console.log(result.id);
                        let jwtKey = '2de778eeb26d0f50756a8a8be12ae8bead2fa79d93dfebed39fc87570f4e1633bb65571dea5246af1df179ed0186badc894d4e4fbf799b84d41a9eb722f9f8ae';
                        // console.log(jwtKey);
                        let token = jwt.sign({ mailId: req.body.mid, userId: result.id }, jwtKey);
                        res.header('Access-Control-Allow-Credentials', true);
                        res.cookie("token", token, { maxAge: 9000000000, httpOnly: false })
                        res.send(JSON.stringify({ status: status, token: token }));
                    // })
            }
            else {
                res.send(JSON.stringify({ status: status, msg: "No such User!" }))
            }
        })
})
app.get('/allPosts', (req, res) => {
    //specify req.body.userdetails
    console.log(req.cookies['token']);
    // const postActions;
    let userId = jwtDecode(req.cookies['token']).userId;
    console.log("token");
    console.log(userId);
    let data = {
        // where: { UserId: userId},
        limit: 15,
         order: [['updatedAt', 'DESC']], include: [
            {
                model: index.Comments,
                // where: { isDeleted: false},
                // required: false,
                // paranoid: false,
                include: [
                    {
                        model: index.CommentActions
                    },
                ]
            }, {
                model: index.Comments,
                // where: { isDeleted: false},
                include: [
                    {
                        model: index.CommentReplies,
                        // where: { isDeleted: false},
                        include: [
                            {
                                model: index.Replies,
                                include: [
                                    { model: index.ReplyActions }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: index.PostActions
            }
        ]
    };
    const userArray = [];
    index.posts.findAll(data).
        then((result5) => {
            console.log("find");
            // console.log(result5.map((e) => {userArray.push(e.dataValues.UserId)}));
            index.Followers.findAll({attributes: ['id','user','follower'],where: {follower: userId,isFollowing: true}}).then((result2) => {
                res.send(JSON.stringify({ postComments: result5, userId: userId,followers: result2 }));
            })
        })
})
app.get('/ownPosts', (req, res) => {
    console.log(req.cookies['token']);
    // const postActions;
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId},
        limit: 15, order: [['updatedAt', 'DESC']], include: [
            {
                model: index.Comments,
                include: [
                    {
                        model: index.CommentActions
                    },
                ]
            }, {
                model: index.Comments,
                include: [

                    {
                        model: index.CommentReplies,
                        include: [
                            {
                                model: index.Replies,
                                include: [
                                    { model: index.ReplyActions }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: index.PostActions
            }
        ]
    };
    index.posts.findAll(data).
        then((result5) => {
            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        })
})

app.post('/makePost', (req, res) => {
    console.log(req.cookies['token']);
    let userId = jwtDecode(req.cookies['token']).userId;
    // console.log(mail);
    let data = { post: req.body.post, UserId: userId };
    index.posts.create(data).
        then((result) => {
            res.send(JSON.stringify({ status: result }));
        })
})
app.post('/makeReply', (req, res) => {
    console.log(req.cookies['token']);
    let userId = jwtDecode(req.cookies['token']).userId;
    // console.log(mail);
    let data = { comment: req.body.comment, UserId: userId, PostId: req.body.postId };
    // let data1 = {comment: req.body.comment,UserId: userId,PostId: req.body.postId};
    if (req.body.type === "reply") {
        index.Replies.create(data).
            then((result) => {
                console.log(result);
                index.CommentReplies.create({ CommentId: req.body.commentId, UserId: userId, ReplyId: result.id }).
                    then((result1) => {
                        res.send(JSON.stringify({ result: result }));

                    })
                // res.send(JSON.stringify({result : result}));

            })
    }
    else {
        index.Comments.create(data).
            then((result) => {
                res.send(JSON.stringify({ result: result }));
            })
    }

})
// app.post('/makeReply',(req,res) => {
//     console.log(req.cookies['token']);
//     let userId = jwtDecode(req.cookies['token']).userId;
//     // console.log(mail);
//     let data = {comment: req.body.comment,type: req.body.type,UserId: userId,PostId: req.body.postId,replyFor: req.body.commentId};
//     // let data1 = {comment: req.body.comment,UserId: userId,PostId: req.body.postId};
//     index.Comments.create(data).
//         then((result) => {
//                 res.send(JSON.stringify({result : result}));
//             // if(req.body.type === "reply"){
//             //     index.Comments.update({reply: result.id},{where: {id:req.body.commentId}}).then((result2)=>{
//             //         res.send(JSON.stringify({result : result}));
//             //     })        
//             // }
//             // else{
//             //     res.send(JSON.stringify({result : result}));
//             // }
//         })
// })
app.post('/deleteReply', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    index.CommentReplies.destroy({ where: { ReplyId: req.body.replyId, UserId: userId } }).then(() => {
        // index.Replies.destroy({ where: { id: req.body.replyId } }).then((result123) => {
        //     index.ReplyActions.destroy({ where: { ReplyId: req.body.replyId } }).then(() => {
        res.send(JSON.stringify({ userId: userId }));
    })
    // }) })
})
app.post('/savePost', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    console.log({ UserId: userId, PostId: req.body.postId});
    index.SavedPOsts.findAll({where: { UserId: userId, PostId: req.body.postId}}).
        then((result) => {
            console.log("save");
            console.log(result);
            console.log(result.length);
            if (result.length == 0) {
                index.SavedPOsts.create({ UserId: userId, PostId: req.body.postId }).
                    then(() => {
                        res.send(JSON.stringify({ msg: "Post has been saved!" }));
                    })
            } else {
                res.send(JSON.stringify({ msg: "Post has been saved Already!" }));
            }
        })
})
app.post('/follow',(req,res) => {
    const data = {user: req.body.userId,follower:req.body.followerId};
    console.log(data);
    index.Followers.findOne({attributes:['id','isFollowing'],where: data}).then((result)=>{
        console.log("f");
        console.log(result);
        if(result){
            result.update({isFollowing: !(result.dataValues.isFollowing)}).then(() => {
                res.send(JSON.stringify({msg: "Updated successfully!"}));
            })
        }
        else{
            index.Followers.create(data).then(() => {
                res.send(JSON.stringify({msg: "Followed successfully!"}));
            })
        }
    })
})
app.get('/mySavedPosts', (req, res) => {
    console.log(req.cookies['token']);
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId},
        // limit: 15, order: [['updatedAt', 'DESC']], 
        include: [
            {
                model: index.posts,
                include: [
                    {
                        model: index.Comments,
                        include: [
                            {
                                model: index.CommentActions
                            },
                        ]
                    }, {
                        model: index.Comments,
                        include: [

                            {
                                model: index.CommentReplies,
                                include: [
                                    {
                                        model: index.Replies,
                                        include: [
                                            { model: index.ReplyActions }
                                        ]
                                    },
                                ]
                            },
                        ]
                    }, {
                        model: index.PostActions
                    }]
            },
        ]
    };
    index.SavedPOsts.findAll(data).
        then((result5) => {
            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        })

})
app.post('/deleteFromSavedPosts', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    index.posts.destroy({ where: { UserId: userId, PostId: req.body.postId } }).then(() => {
        res.send(JSON.stringify({ msg: "Post has been removed from Saved Posts!" }));
    })

})
app.post('/deleteComment', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId},
        // attributes: ['id', 'comments.id'], 
        include: [
            {
                model: index.CommentActions
            },
            {
                model: index.CommentReplies,
                include: [
                    {
                        model: index.Replies,
                        include: [
                            { model: index.ReplyActions }
                        ]
                    },
                ]
            },
        ],
    };
    let replyArray = [];
    index.Comments.findAll(data).
        then((result5) => {
            console.log(result5[0].dataValues);
            result5[0].dataValues.CommentReplies.forEach(el => {
                console.log(el);
                replyArray.push(el.dataValues.id);
            })
            index.CommentReplies.destroy({ where: { id: replyArray } }).then(() => {
                // index.Replies.destroy({ where: { id: replyArray } }).then((result123) => {
                //     index.ReplyActions.destroy({ where: { id: replyArray } }).then(() => {
                index.Comments.destroy({ where: { id: req.body.commentId } }).then(() => {
                    // index.CommentActions.destroy({ where: { id: req.body.commentId } }).then(() => {
                    res.send(JSON.stringify({ postComments: result5, userId: userId,replyArray: replyArray }));
                    // })
                })
            })
            // console.log(result123);
        })
})
// })})

app.post('/deletePost', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId},
        // attributes: ['id', 'comments.id'],
         include: [
            {
                model: index.Comments,
                include: [
                    {
                        model: index.CommentActions
                    },
                ]
            }, {
                model: index.Comments,
                include: [

                    {
                        model: index.CommentReplies,
                        include: [
                            {
                                model: index.Replies,
                                include: [
                                    { model: index.ReplyActions }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: index.PostActions
            }
        ],
    };
    let commentArray = [];
    let replyArray = [];
    console.log("hiingaaa");
    index.posts.findAll(data).
        then((result5) => {
            console.log(result5[0].dataValues);
            result5[0].dataValues.Comments.forEach(element => {
                console.log(element);
                commentArray.push(element.dataValues.id);
                console.log("hi");
                element.dataValues.CommentReplies.forEach(el => {
                    console.log(el);
                    replyArray.push(el.dataValues.id);
                    
                })
            })
                    index.CommentReplies.destroy({ where: { id: replyArray } }).then(() => { })
                    // index.Replies.destroy({ where: { id: replyArray } }).then((result123) => {
                    //     index.ReplyActions.destroy({ where: { id: replyArray } }).then(() => {
                    index.Comments.destroy({ where: { id: commentArray } }).then(() => {
                        // index.CommentActions.destroy({ where: { id: commentArray } }).then(() => {
                        index.posts.destroy({ where: { id: req.body.postId } }).then(() => {
                            // index.PostActions.destroy({ where: { id: req.body.postId } }).then((r) => {
                            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        
                            // })
                        })
                        })
            })
        // })
    // console.log(result123);
    // })
    // })
    // console.log(mail);
    // let data = { id : req.body.postId, UserId: userId };
    // index.Comments.findAll({ where: { PostId : req.body.postId, UserId: userId },attributes: ['id'] }).    
    //     then((result) => {
    //         console.log(result);
    //         res.send(JSON.stringify({ status: result }));
    //     })
    // index.Comments.destroy({ where: { PostId : req.body.postId, UserId: userId } }).    
    //     then((result) => {
    //         index.posts.destroy({ where: data }).
    //         then((r1) => {
    //             console.log("r1");
    //             console.log(r1);
    //             // index.Replies.destroy({ where: { PostId : req.body.postId, UserId: userId } }).
    //             // then(() => {
    //                 res.send(JSON.stringify({ status: result }));
    //             // })
    //         })
    //     })
})
function postAction(req, res) {
    let userId = jwtDecode(req.cookies['token']).userId;
    console.log("hlo");
    console.log(userId);
    var reqData = req.body;
    let data = { PostId: reqData.stuffId, UserId: userId };
    let data2 = { action: reqData.action, PostId: reqData.stuffId, UserId: userId };
    if (reqData.toDelete) {
        index.PostActions.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        index.PostActions.findOne({ where: data }).
            then((result) => {
                console.log("hi");
                console.log(result);
                if (result) {
                    result.update({ action: reqData.action }).
                        then(result1 => {
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
                else {
                    index.PostActions.create(data2).
                        then(result1 => {
                            console.log("final");
                            console.log(data2);
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
            })
    }
}
function commentAction(req, res) {
    let userId = jwtDecode(req.cookies['token']).userId;
    var reqData = req.body;
    let data = { CommentId: reqData.stuffId, UserId: userId };
    let data2 = { action: reqData.action, CommentId: reqData.stuffId, UserId: userId };
    console.log(data);
    //already liked or disliked if so update else create
    if (reqData.toDelete) {
        index.CommentActions.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        index.CommentActions.findOne({ where: data }).
            then((result) => {
                console.log("hi");
                console.log(result);
                if (result) {
                    result.update({ action: reqData.action }).
                        then(result1 => {
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
                else {
                    index.CommentActions.create(data2).
                        then(result1 => {
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
            })
    }

}
function replyAction(req, res) {
    let userId = jwtDecode(req.cookies['token']).userId;
    var reqData = req.body;
    let data = { UserId: userId, ReplyId: reqData.stuffId };
    let data2 = { action: reqData.action, UserId: userId, ReplyId: reqData.stuffId };
    console.log(data);
    //already liked or disliked if so update else create
    if (reqData.toDelete) {
        index.ReplyActions.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        index.ReplyActions.findOne({ where: data }).
            then((result) => {
                console.log("hi");
                console.log(result);
                if (result) {
                    result.update({ action: reqData.action }).
                        then(result1 => {
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
                else {
                    index.ReplyActions.create(data2).
                        then(() => {
                            res.send(JSON.stringify({ status: "success" }));
                        })
                }
            })
    }

}
app.post('/action', (req, res) => {
    var reqData = req.body;
    switch (reqData.stuffType) {
        case "post":
            postAction(req, res);
            break;
        case "comment":
            commentAction(req, res);
            break;
        case "reply":
            replyAction(req, res);
            break;
    }

})


app.listen(8080, () => { console.log("listen") });