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
    CaseStudiesPage = keystone.list('CaseStudiesPage'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'caseStudies';

    view.on('init', function(next) {

        var queryCaseStudy = CaseStudy.model.find({}, {}, {
            sort: {
                name: 1
            }
        })
        .populate('modalities');

        var queryCaseStudiesPage = CaseStudiesPage.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        })
        .populate('caseStudies');
        
        queryCaseStudy.exec(function(err, result) {
            if (err) throw err;

            if(!result)
                return res.notfound('Cannot find that part of the guide', 'Sorry, but it looks like the guide page you were looking for does not exist!');

            locals.caseStudies = result;

            queryCaseStudiesPage.exec(function(err, result) {
                if (err) throw err;

                if(!result)
                    return res.notfound('Cannot find the case studies index content', 'Sorry, but it looks like case studies content is missing!');

                locals.pageName = result.name;
                locals.pageTitle = result.title;
                locals.pageText = result.text;

                next();

            });

        });
    });

    // Render the view
    view.render('caseStudies');

};
