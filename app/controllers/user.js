var User = require('../models/user')
// app.post('/user/signup/:userid', function(req, res){
    //  //以传递路由的方式获取
    //  var _userid = req.params.userid
    //  // /user/signup/1111?uerid=1112 一同哟URL提交的query参数串的方式获取
    //  // var _userid = req.query.userid
    //  // 表单提交post或者异步的ajax post 一个data 在body里面 
    //  // var _userid = req.body.userid
    //  // req.param('user')  不知道是哪个
    //  // /user/signup/1111?uerid=1112 
    //  // ｛userid: 1113｝  这样拿到的值  ？？ 优先级 是路由中变量 要是没有 就body 在没有就query
    // })
//showSignup
exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}


//showSignin
exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}

//signup
exports.signup =  function(req, res){
    var _user = req.body.user  //req.param('user')
    // console.log(_user)

    User.findOne({name: _user.name}, function(err, user){
        if(err){
            console.log(err)
        }
        if(user){
            console.log('User already exist')
            return res.redirect('/signin')
        }
        else{
            var user = new User(_user)
            user.save(function(err, user){
            if(err){
                console.log(err)
            }
            console.log(user)
            res.redirect('/')
            //console.log(user)
            })
        }
    })
}

//signin  用户登录
exports.signin = function(req, res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name: name}, function(err, user){
        if(err){
            console.log(err)
        }

        if(!user){
            console.log('user dont exist')
            return res.redirect('/signup')
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user
                console.log('password is matched')
                return res.redirect('/')
            }
            else{
                return res.redirect('/signin')
                console.log('password is not matched')
            }
        })
    })
}

//logout
exports.logout = function(req, res){
    delete req.session.user
    //delete app.locals.user
    res.redirect('/')
}

//userlist page
exports.list = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err)
        }

      res.render('userlist', {
        title: 'imooc 用户列表页',
        users: users
      })
    })
}

//midware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

//midware for admin
exports.adminRequired = function(req, res, next) {
    var user = req.session.user
    console.log(user)
    if(user.role <= 10){
        return res.redirect('/signin')
    }
    next()
}