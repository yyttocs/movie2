var _ = require('underscore')
var Movie = require('../models/movie')
var Comment = require('../models/comment')
var path = require('path')
var Category = require('../models/category')
//admin new page
exports.new = function(req, res) {
    res.render('category_admin', {
        title: 'imooc 后台分类录入页',
        category: {}
    })
}


// admin post movie
exports.save = function(req, res) {
    var _categroy = req.body.category
    var category = new Category(_categroy)
    
    category.save(function(err, category){
        if(err){
            console.log(err)
        }
        res.redirect('/admin/category/list')
    })    
}

//categorylist page
exports.list = function(req, res) {
    Category.fetch(function(err, categories) {
        if (err) {
            console.log(err)
        }

        res.render('categorylist', {
        title: 'imooc 分类列表页',
        categories: categories
      })
    })
}

