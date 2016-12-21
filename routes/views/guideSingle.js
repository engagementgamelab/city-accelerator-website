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
    Guide = keystone.list('Guide'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Render the view
    view.render('guide-single');

};
