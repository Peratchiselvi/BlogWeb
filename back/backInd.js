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
const UsersTable = require("./models/userModel");
const CommentsTable = require("./models/commentModel");
const PostsTable = require("./models/postModel");
const CommentActionsTable = require("./models/commentActionModel");
const PostActionsTable = require("./models/postActionModel");
const ReplyActionsTable = require("./models/replyActionModel");
const ReplyTable = require("./models/replyModel");
const SavedPostsTable = require("./models/savedPostsModel");
const CommentReplyTable = require("./models/commentReplyModel");
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
UsersTable.hasMany(PostsTable);
PostsTable.belongsTo(UsersTable);
UsersTable.hasMany(CommentsTable);
PostsTable.hasMany(CommentsTable);
CommentsTable.belongsTo(PostsTable);
UsersTable.hasMany(SavedPostsTable);
SavedPostsTable.belongsTo(UsersTable);
PostsTable.hasMany(SavedPostsTable);
SavedPostsTable.belongsTo(PostsTable);
PostsTable.hasMany(PostActionsTable);
UsersTable.hasMany(PostActionsTable);
PostActionsTable.belongsTo(UsersTable);
UsersTable.hasMany(CommentActionsTable);
CommentActionsTable.belongsTo(UsersTable);
UsersTable.hasMany(ReplyActionsTable);
ReplyActionsTable.belongsTo(UsersTable);
PostActionsTable.belongsTo(PostsTable);
CommentsTable.hasMany(CommentActionsTable);
CommentActionsTable.belongsTo(CommentsTable);
ReplyTable.hasMany(ReplyActionsTable);
ReplyActionsTable.belongsTo(ReplyTable);
CommentsTable.hasMany(CommentReplyTable);
CommentReplyTable.belongsTo(CommentsTable);
ReplyTable.hasOne(CommentReplyTable);
CommentReplyTable.belongsTo(ReplyTable);
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
    UsersTable.findAll({ where: { mailId: req.body.mid } }).
        then(result => {
            let status = result.length > 0 ? false : true;
            if (status) {
                UsersTable.create(data).
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
app.get('/profilePosts', (req, res) => {
    //specify req.body.userdetails
    console.log(req.cookies['token']);
    // const postActions;
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: {UserId: userId},
        limit: 15, order: [['updatedAt', 'DESC']], include: [
            {
                model: CommentsTable,
                include: [
                    {
                        model: CommentActionsTable
                    },
                ]
            }, {
                model: CommentsTable,
                include: [

                    {
                        model: CommentReplyTable,
                        include: [
                            {
                                model: ReplyTable,
                                include: [
                                    { model: ReplyActionsTable }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: PostActionsTable
            }
        ]
    };
    PostsTable.findAll(data).
        then((result5) => {
            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        })
})
app.get('/ownPosts', (req, res) => {
    console.log(req.cookies['token']);
    // const postActions;
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: {UserId: userId},
        limit: 15, order: [['updatedAt', 'DESC']], include: [
            {
                model: CommentsTable,
                include: [
                    {
                        model: CommentActionsTable
                    },
                ]
            }, {
                model: CommentsTable,
                include: [

                    {
                        model: CommentReplyTable,
                        include: [
                            {
                                model: ReplyTable,
                                include: [
                                    { model: ReplyActionsTable }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: PostActionsTable
            }
        ]
    };
    PostsTable.findAll(data).
        then((result5) => {
            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        })
})

app.post('/makePost', (req, res) => {
    console.log(req.cookies['token']);
    let userId = jwtDecode(req.cookies['token']).userId;
    // console.log(mail);
    let data = { post: req.body.post, UserId: userId };
    PostsTable.create(data).
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
        ReplyTable.create(data).
            then((result) => {
                CommentReplyTable.create({ CommentId: req.body.commentId, ReplyId: result.id }).
                    then((result1) => {
                        res.send(JSON.stringify({ result: result }));

                    })
                // res.send(JSON.stringify({result : result}));

            })
    }
    else {
        CommentsTable.create(data).
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
//     CommentsTable.create(data).
//         then((result) => {
//                 res.send(JSON.stringify({result : result}));
//             // if(req.body.type === "reply"){
//             //     CommentsTable.update({reply: result.id},{where: {id:req.body.commentId}}).then((result2)=>{
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
    CommentReplyTable.destroy({ where: { ReplyId: req.body.replyId, UserId: userId  } }).then(() => {
    ReplyTable.destroy({ where: { id: req.body.replyId } }).then((result123) => {
        ReplyActionsTable.destroy({ where: { ReplyId: req.body.replyId } }).then(() => {
            res.send(JSON.stringify({ userId: userId }));
        })
    }) })
})
app.post('/savePost',(req,res)=>{
    SavedPostsTable.findAll({UserId: req.body.userId, PostId: req.body.postId}).
    then((result) => {
        if(result.length == 0){
        SavedPostsTable.create({UserId: req.body.userId, PostId: req.body.postId}).
        then(() => {
            res.send(JSON.stringify({ msg: "Post has been saved!" }));
        })  
    }else{
        res.send(JSON.stringify({ msg: "Post has been saved Already!" }));
    }
    })    
})
app.get('/mySavedPosts',(req,res)=>{
    console.log(req.cookies['token']);
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: {UserId: userId},
        // limit: 15, order: [['updatedAt', 'DESC']], 
        include: [
            {
                model: PostsTable,
                include : [
                    {
                        model: CommentsTable,
                        include: [
                            {
                                model: CommentActionsTable
                            },
                        ]
                    }, {
                        model: CommentsTable,
                        include: [
        
                            {
                                model: CommentReplyTable,
                                include: [
                                    {
                                        model: ReplyTable,
                                        include: [
                                            { model: ReplyActionsTable }
                                        ]
                                    },
                                ]
                            },
                        ]
                    }, {
                        model: PostActionsTable
                    }]
            },
        ]
    };
    SavedPostsTable.findAll(data).
        then((result5) => {
            res.send(JSON.stringify({ postComments: result5, userId: userId }));
        })

})
app.post('/deleteFromSavedPosts',(req,res)=>{
    let userId = jwtDecode(req.cookies['token']).userId;
    SavedPostsTable.destroy({where: {UserId: userId,PostId: req.body.postId}}).then(()=>{
        res.send(JSON.stringify({ msg: "Post has been removed from Saved Posts!" }));
    })

})
app.post('/deleteComment', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId },
        // attributes: ['id', 'comments.id'], 
        include: [
            {
                model: CommentActionsTable
            },
            {
                model: CommentReplyTable,
                include: [
                    {
                        model: ReplyTable,
                        include: [
                            { model: ReplyActionsTable }
                        ]
                    },
                ]
            },
        ],
    };
    let replyArray = [];
    CommentsTable.findAll(data).
        then((result5) => {
            console.log(result5[0].dataValues);
            result5[0].dataValues.CommentReplies.forEach(el => {
                console.log(el);
                replyArray.push(el.dataValues.id);
            })
            CommentReplyTable.destroy({ where: { id: replyArray } }).then(() => {
                ReplyTable.destroy({ where: { id: replyArray } }).then((result123) => {
                    ReplyActionsTable.destroy({ where: { id: replyArray } }).then(() => {
                        CommentsTable.destroy({ where: { id: req.body.commentId } }).then(() => {
                            CommentActionsTable.destroy({ where: { id: req.body.commentId } }).then(() => {
                                res.send(JSON.stringify({ postComments: result5, userId: userId }));
                            })
                        })
                    })
                    console.log(result123);
                })
            })
        })

})

app.post('/deletePost', (req, res) => {
    let userId = jwtDecode(req.cookies['token']).userId;
    let data = {
        where: { UserId: userId },
        attributes: ['id', 'comments.id'], include: [
            {
                model: CommentsTable,
                include: [
                    {
                        model: CommentActionsTable
                    },
                ]
            }, {
                model: CommentsTable,
                include: [

                    {
                        model: CommentReplyTable,
                        include: [
                            {
                                model: ReplyTable,
                                include: [
                                    { model: ReplyActionsTable }
                                ]
                            },
                        ]
                    },
                ]
            }, {
                model: PostActionsTable
            }
        ],
    };
    let commentArray = [];
    let replyArray = [];
    PostsTable.findAll(data).
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
            });
            CommentReplyTable.destroy({ where: { id: replyArray } }).then(() => { })
            ReplyTable.destroy({ where: { id: replyArray } }).then((result123) => {
                ReplyActionsTable.destroy({ where: { id: replyArray } }).then(() => {
                    CommentsTable.destroy({ where: { id: commentArray } }).then(() => {
                        CommentActionsTable.destroy({ where: { id: commentArray } }).then(() => {
                            PostsTable.destroy({ where: { id: req.body.postId } }).then(() => {
                                PostActionsTable.destroy({ where: { id: req.body.postId } }).then((r) => {
                                    res.send(JSON.stringify({ postComments: result5, userId: userId }));

                                })
                            })
                        })
                    })
                })
                console.log(result123);
            })
        })
    // console.log(mail);
    // let data = { id : req.body.postId, UserId: userId };
    // CommentsTable.findAll({ where: { PostId : req.body.postId, UserId: userId },attributes: ['id'] }).    
    //     then((result) => {
    //         console.log(result);
    //         res.send(JSON.stringify({ status: result }));
    //     })
    // CommentsTable.destroy({ where: { PostId : req.body.postId, UserId: userId } }).    
    //     then((result) => {
    //         PostsTable.destroy({ where: data }).
    //         then((r1) => {
    //             console.log("r1");
    //             console.log(r1);
    //             // ReplyTable.destroy({ where: { PostId : req.body.postId, UserId: userId } }).
    //             // then(() => {
    //                 res.send(JSON.stringify({ status: result }));
    //             // })
    //         })
    //     })
})
function postAction(req, res) {
    let userId = jwtDecode(req.cookies['token']).userId;
    var reqData = req.body;
    let data = { PostId: reqData.stuffId, UserId: userId };
    let data2 = { action: reqData.action, PostId: reqData.stuffId, UserId: userId };
    if (reqData.toDelete) {
        PostActionsTable.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        PostActionsTable.findOne({ where: data }).
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
                    PostActionsTable.create(data2).
                        then(result1 => {
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
        CommentActionsTable.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        CommentActionsTable.findOne({ where: data }).
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
                    CommentActionsTable.create(data2).
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
        ReplyActionsTable.destroy({ where: data2 }).then(() => {
            res.send(JSON.stringify({ status: "success" }));
        })
    }
    else {
        ReplyActionsTable.findOne({ where: data }).
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
                    ReplyActionsTable.create(data2).
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