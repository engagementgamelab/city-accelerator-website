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
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = res.params.activity_key;

    view.on('init', function(next) {
        var categorize = function(val, cat) {
            return val.filter(function(item) {
                return item.category == cat;
            });
        };

        var queryCard = Card.model.find({}, {}, {});

        var queryToolkit = Toolkit.model.findOne({}, {}, {
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


        queryCard.exec(function(err, result) {
            if (err) throw err;

            if(result === null)
                return res.notfound('Cannot find that part of the toolkit', 'Sorry, but it looks like the card you were looking for does not exist!');

            locals.introOne = categorize(result, 'IntroOne');
            locals.introTwo = categorize(result, 'IntroTwo');
            locals.startCard = categorize(result, 'Getting Started');
            locals.planCard = categorize(result, 'Project Planning');
            locals.implementCard = categorize(result, 'Implementation');
            locals.iterateCard = categorize(result, 'Iteration');

            queryActivity.exec(function(err, resultActivity) {
                if (err) throw err;

                if(resultActivity === null)
                    return res.notfound('Not found', 'Sorry, but it looks like the activity you were looking for does not exist!');

                // locals.activities = resultActivity;
                locals.startActivities = categorize(resultActivity, 'Getting Started');
                locals.planActivities = categorize(resultActivity, 'Project Planning');
                locals.implementActivities = categorize(resultActivity, 'Implementation');
                locals.iterateActivities = categorize(resultActivity, 'Iteration');

                queryToolkit.exec(function(err, result) {
                    if (err) throw err;

                    if(result === null)
                        return res.notfound('Cannot find that part of the toolkit', 'Sorry, but it looks like the card you were looking for does not exist!');

                    locals.startTitle = result.startTitle;
                    locals.startBlurb = result.startBlurb.html;
                    locals.planTitle = result.planTitle;
                    locals.planBlurb = result.planBlurb.html;
                    locals.implementTitle = result.implementTitle;
                    locals.implementBlurb = result.implementBlurb.html;
                    locals.iterateTitle = result.iterateTitle;
                    locals.iterateBlurb = result.iterateBlurb.html;

                    next();
                });
            });
        });
    });

    // Render the view
    view.render('toolkit');

};
