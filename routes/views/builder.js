/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Builder page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Builder
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Activity = keystone.list('Activity'),
    Builder = keystone.list('Builder'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    // locals.section = '';

    view.on('init', function(next) {

        var queryBuilder = Builder.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });


        var queryActivity = Activity.model.find({}).sort([
            ['sortOrder', 'ascending']
        ])
        .populate('links')
        .populate('images')
        .populate('thumbnail');


        queryBuilder.exec(function(err, resultBuilder) {
            if (err) throw err;

            if(resultBuilder === null)
                return res.notfound('Cannot find that part of the guide', 'Sorry, but it looks like the guide page you were looking for does not exist!');

            locals.toolkit = resultBuilder;

            queryActivity.exec(function(err, resultActivity) {
                if (err) throw err;

                if(resultActivity === null)
                    return res.notfound('Not found', 'Sorry, but it looks like the activity you were looking for does not exist!');

                locals.activities = resultActivity;

                next();

            });


        });
    });

    // Render the view
    view.render('builder');

};
