/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Toolkit page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Toolkit
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Activity = keystone.list('Activity'),
    Toolkit = keystone.list('Toolkit'),
    // Card = keystone.list('Card'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'toolkitHome';

    view.on('init', function(next) {
        var categorize = function(val, cat) {
            return val.filter(function(item) {
                return item.category == cat;
            });
        };

        var queryHome = Toolkit.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        var queryActivity = Activity.model.find({}).sort([
            ['sortOrder', 'ascending']
        ])
        .populate('links')
        .populate('images')
        .populate('icon');


        queryActivity.exec(function(err, result) {
            if (err) throw err;

            if(result === null)
                return res.notfound('Cannot find that part of the toolkit', 'Sorry, but it looks like the activity you were looking for does not exist!');

            locals.startActivities = categorize(result, 'Getting Started');
            locals.planActivities = categorize(result, 'Project Planning');
            locals.implementActivities = categorize(result, 'Implementation');
            locals.iterateActivities = categorize(result, 'Iteration');

            queryHome.exec(function(err, result) {
                if (err) throw err;

                if(result === null)
                    return res.notfound('Cannot find that part of the toolkit', 'Sorry, but it looks like the card you were looking for does not exist!');

                locals.header = result.header;
                locals.browseTitle = result.browseTitle;
                locals.browseText = result.browseText;
                locals.browseButton = result.browseButton;
                locals.builderTitle = result.builderTitle;
                locals.builderButton = result.builderButton;
                locals.builderText = result.builderText;

                next();
            });
        });
    });

    // Render the view
    view.render('toolkitHome');

};
