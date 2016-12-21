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

    // Init locals
    // locals.section = '';

    view.on('init', function(next) {

        var categorize = function(val, cat) {
            return val.filter(function(item) {
                return item.section == cat;
            });
        };

        var queryGuide = Guide.model.find({});

        queryGuide.exec(function(err, resultGuide) {
            if (err) throw err;

            if(resultGuide === null)
                return res.notfound('Cannot find that part of the guide', 'Sorry, but it looks like the guide page you were looking for does not exist!');

            locals.guides = resultGuide;
            // locals.chartingGuides = categorize(resultGuide, 'Charting');
            // locals.calibratingGuides = categorize(resultGuide, 'Calibrating');
            // locals.goingGuides = categorize(resultGuide, 'Going Places');

            next();

        });
    });

    // Render the view
    view.render('guide');

};
