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

    var categorize = function(val, cat) {
         return val.filter(function(item) {
            return item.section == cat;
        });
    };

    view.on('init', function(next) {

        var queryGuidePage = Guide.model.findOne({
            guide_key: req.params.guide_key
        });

        var queryTOC = Guide.model.find({}, 'name guide_key section isSection', {
           sort: {
                'sortOrder': 1
            } 
        });
            

        queryGuidePage.exec(function(err, resultGuide) {
            if (err) throw err;

            if(!resultGuide)
                return res.notfound('Cannot find that part of the guide', 'Sorry, but it looks like the guide page you were looking for does not exist!');

            locals.content = resultGuide;
            locals.page_key = resultGuide.guide_key;

            queryTOC.exec(function(errTOC, resultTOC) {

                if (errTOC) throw errTOC;

                locals.guides = resultTOC;
                console.log(locals.guides);
                locals.chartingGuides = categorize(resultTOC, 'Charting');
                locals.calibratingGuides = categorize(resultTOC, 'Calibrating');
                locals.goingGuides = categorize(resultTOC, 'Going Places');

                var pages = _.pluck(locals.guides, 'guide_key');
                var ind = _.indexOf(pages, req.params.guide_key);
                locals.pages = {'next': locals.guides[ind + 1], 'back': locals.guides[ind - 1]};
                console.log(locals.pages);
                next();

            });

        });
    });

    // Render the view
    view.render('guide-page');

};
