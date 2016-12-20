/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Index = keystone.list('Index'),
    // Category = keystone.list('Category'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var queryIndex = Index.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        queryIndex.exec(function(err, resultIndex) {
            if (err) throw err;

            if(resultIndex === null)
                return res.notfound('Cannot find that home page -- check your database!', 'Sorry, but it looks like the home page you were looking for does not exist!');


            locals.index = resultIndex;
            locals.title = resultIndex.title.html;
            locals.header = resultIndex.header.html;
            locals.theToolkit = resultIndex.theToolkit;
            locals.toolkitLink = resultIndex.toolkitLink;
            locals.theCaseStudies = resultIndex.theCaseStudies;
            locals.caseLink = resultIndex.caseLink;
            locals.theGame = resultIndex.theGame;
            locals.gameLink = resultIndex.gameLink;
            locals.theGuide = resultIndex.theGuide;
            locals.guideLink = resultIndex.guideLink;
                
                next();

        });
    });

    // Render the view
    view.render('index');

};
