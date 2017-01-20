/**
 * City Accelerator Website
 * 
 * CaseStudy page Model
 * @module CaseStudy
 * @class CaseStudy
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CaseStudy model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CaseStudy = new keystone.List('CaseStudy', 
	{
		label: 'Case Studies',
		singular: 'Case Study',
		track: true,
		autokey: { path: 'case_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main CaseStudy
 */
CaseStudy.add({

	name: { type: String, label: 'Case Study Title', required: true, initial: true },
	enabled: { type: Boolean, label: 'Enable This Case Study?', note: 'If this case study is not enabled, it will not show up on the site!'},
	image: { 
		type: Types.CloudinaryImage, 
		label: 'Blurb Image', 
		note: 'The image showing on the case studies landing page.',
    	folder: 'city-accelerator-website/case-studies',
    	autoCleanup: true
	},
	teamImage: { 
		type: Types.CloudinaryImage, 
		label: 'Team image', 
		note: 'the image of the team. appears below header.',
    	folder: 'city-accelerator-website/case-studies',
    	autoCleanup: true
	},
	byline: { type: Types.Markdown, label: 'Case Study Byline'},
	modalities: {
		type: Types.Relationship, 
		label: "Modalities",
		ref: 'Activity',
		many: true
	},
	phaseI: { type: Types.Markdown, label: 'Phase I Implementation', note: ''},
	phaseII: { type: Types.Markdown, label: 'Phase II Implementation', note: ''},
	funds: { type: Types.Markdown, label: 'Fund Allocation', note: ''},
	text: { type: Types.Markdown, label: 'Case Study Text', note: ''},
	readMore: { type: Types.Markdown, label: 'Read More Text'},
	team: { type: Types.Markdown, label: 'Team', note: ''},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

// Remove a link or image reference if removed from database
CaseStudy.schema.statics.removeRef = function(refId, callback) {

    CaseStudy.model.update({
             'modalities': refId
        },

        {
            $pull: {
                'modalities': refId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Model Registration
 */
CaseStudy.defaultSort = '-createdAt';
CaseStudy.defaultColumns = 'name, updatedAt';
CaseStudy.register();
