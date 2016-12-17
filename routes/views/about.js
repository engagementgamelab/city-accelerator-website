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
    Partner = ketstone.list('Partner'),
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
        });
        queryAbout.exec(function(err, resultAbout) {
            if (err) throw err;

            locals.about = resultAbout;
            
                
                next();

            // });

        });
    });

    // Render the view
    view.render('index');

};
