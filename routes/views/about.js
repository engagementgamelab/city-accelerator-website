/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * About page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class About
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    About = keystone.list('About'),
    Partner = keystone.list('Partner'),
    // Category = keystone.list('Category'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'about';

    view.on('init', function(next) {

        var queryAbout = About.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        })
        .populate('partners');

        queryAbout.exec(function(err, resultAbout) {
            if (err) throw err;

            locals.about = resultAbout;
            locals.pageTitle = resultAbout.title;
            locals.pageHeader = resultAbout.header;
            locals.description = resultAbout.description;
            locals.programGoals = resultAbout.programGoals;
            locals.cohort = resultAbout.aboutTheCohort;
            locals.public = resultAbout.aboutPublic;
            locals.images = resultAbout.images;
            locals.headerImages = resultAbout.headerImages;
            locals.partners = resultAbout.partners;

            next();

        });
    });

    // Render the view
    view.render('about');

};
