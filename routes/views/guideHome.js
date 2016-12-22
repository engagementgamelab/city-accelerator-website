/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Guide page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Guide
 * @author
 *
 * ==========
 */
var keystone = require('keystone'),
    GuideHome = keystone.list('GuideHome'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    // locals.section = '';

    view.on('init', function(next) {

        var queryGuideHome = GuideHome.model.findOne({});

        queryGuideHome.exec(function(err, result) {
            if (err) throw err;

            if(!result)
                return res.notfound('Cannot find that part of the guide', 'Sorry, but it looks like the guide page you were looking for does not exist!');

            locals.title = result.name;
            locals.byline = result.byline;
            locals.buttons = result.buttons;

            next();

        });
    });

    // Render the view
    view.render('guideHome');

};
