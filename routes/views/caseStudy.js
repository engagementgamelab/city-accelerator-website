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
    locals.subSection = req.params.case_key;
    locals.section = "caseStudy";

    view.on('init', function(next) {

        var queryCaseStudy = CaseStudy.model.findOne({
            case_key: req.params.case_key
        })
        .populate('modalities');

        queryCaseStudy.exec(function(err, result) {
            if (err) throw err;

            if(result === null)
                return res.notfound('Cannot find that case study', 'Sorry, but it looks like the case study you were looking for does not exist!');

            locals.caseStudy = result;
            locals.modalities = result.modalities;
            locals.backgroundImage = result.image;
            locals.title = result.name;
            locals.byline = result.byline.html;
            locals.phaseI = result.phaseI.html;
            locals.phaseII = result.phaseII.html;
            locals.funds = result.funds.html;
            locals.text = result.text.html;
            locals.team = result.team.html;
            locals.readMore = result.readMore.html;

            if (locals.modalities.length !== 0) {
                _.each(result.modalities, function (modality) {
                    modality.populate('icon', function(err, newResult) {
                        locals.modalities.icon = newResult.icon.image;
                        
                    });
                });
                next();
            } else {
                next ();
            }
            
        });
    });

    // Render the view
    view.render('caseStudy');

};
