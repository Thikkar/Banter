const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/users');
//const Article = require('../models/articles');
const Article = require('../models/articles')

const initializePassport = require('../passport-config');
const users = require('../models/users');
initializePassport(
    passport, 
    id => {
        return User.find({ id: id })
    }
)
//router.use(passport.initialize());
//router.use(passport.session());

router.get('/users', async (req, res, next) => {
    await User.find((err, users) => {
        res.json(users);
    });
});

router.patch('/users', async (req, res, next) => {
    try {
        const user = await User.find({
            username: req.body.original_username
        });

        console.log(user)

        if (req.body.first_name) {
            user[0].first_name = req.body.first_name
        }

        if (req.body.last_name) {
            user[0].last_name = req.body.last_name
        }

        if (req.body.username) {
            user[0].username = req.body.username
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user[0].password = hashedPassword
        }

        if (req.body.favTeam) {
            user[0].favTeam = req.body.favTeam
        }

        await user[0].save();
        
        res.json({ msg: "Profile successfully editted"})


    } catch {
        res.sendStatus(400);
    }    
})

router.post('/users/register', async (req, res, next) => {
    try {
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        
        //const user = { name: req.body.name, password: hashedPassword };
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            favTeam: req.body.favTeam
        });
    
        newUser.save((err) => {
            if (err) {
                res.json({msg: 'Failed to add user'});
            } else {
                res.json({msg: 'User added successfully'});
            }
        });
    } catch {
        res.status(500).send();
    }
});

/*
router.post('/users/login', async (req, res, next) => {
    const user = await User.find({
        username: req.body.username
    });
    console.log(user)
    
    if (user.length == 0) {
        res.json({auth: false});
    }

    try {
        if (await bcrypt.compare(req.body.password, user[0].password)) {
            res.json({auth: true});
            //res.send(true);
            console.log("post");
        } else {
            res.json({auth: false});
        }
    } catch {
        res.status(500).send();
    }
});*/

router.post('/users/login', 
    passport.authenticate('local'),
    async (req, res) => {
        try {
            const user = await User.find({
                username: req.body.username
            });
            req.session.user = user;
            // if (user) send /, else send /login
            res.status(200).send({ redirect: "/",
                                loggedIn: true,
                                user: user });
        } catch {
            res.send({
                redirect: "/login",
                loggedIn: false,
                user: null
            })
        }
    }
)

router.delete('/users/:id', (req, res, next) => {
    User.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }   
    });
});

router.get('/articles', async (req, res, next) => {
    /*if (req.body.title) {
        const article = await Article.find({
            title: req.body.title
        }, (err, article) => {
            res.json(article);
        });
    } else {
        await Article.find((err, articles) => {
            res.json(articles);
        });
    }*/
    
    await Article.find((err, articles) => {
        res.json(articles);
    });
});

router.get('/articles/:title', async (req, res, next) => {
    const article = await Article.find({
        title: req.params.title
    }, (err, article) => {
        res.json(article);
    })
})

//all new articles are posted immedately to database
router.post('/articles', async (req, res, next) => {
    try {
        const article = await Article.find({
            title: req.body.title
        });

        if (article.length > 0) {
            res.json({msg: "Article already exists"})
        } else {
            const newArticle = new Article({
                title: req.body.title,
                author: req.body.author,
                body: req.body.body,
                comments: [],
                article_url: req.body.article_url,
                image_url: req.body.image_url
            });

            newArticle.save((err) => {
                if (err) {
                    res.json({msg: 'Failed to add article'});
                } else {
                    res.json({msg: 'Article added successfully'});
                }
            });
        }
    } catch {
        res.status(500).send();
    }
});

router.patch('/articles', async (req, res, next) => {
    try {
        const articles = await Article.find({
            title: req.body.title
        })
        //console.log(articles[0].comments)
        const comment = {
            comment: req.body.comment,
            username: req.body.username,
            time: req.body.time
        }
        // time: moment().format('h: mm a')
        articles[0].comments.push(comment)
        await articles[0].save()

        res.json({ msg: 'Comment posted successfully',
                   comments: articles[0].comments })
    } catch {
        res.sendStatus(500);
    }
});

router.delete('/articles/:id', (req, res, next) => {
    Article.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }   
    });
});

router.delete('/articles', (req, res, next) => {
    Article.remove({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;

