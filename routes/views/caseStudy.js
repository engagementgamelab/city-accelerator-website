/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * CaseStudy page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class CaseStudy
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    CaseStudy = keystone.list('CaseStudy'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    // locals.section = '';

    view.on('init', function(next) {

        var queryCaseStudy = CaseStudy.model.findOne({
            case_key: req.params.case_key
        });
        queryCaseStudy.exec(function(err, result) {
            if (err) throw err;

            if(result === null)
                return res.notfound('Cannot find that case study', 'Sorry, but it looks like the case study you were looking for does not exist!');

            locals.caseStudy = result;

            next();

        });
    });

    // Render the view
    view.render('caseStudy');

};
