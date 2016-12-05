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
		autokey: { path: 'case_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main CaseStudy
 */
CaseStudy.add({

	name: { type: String, label: 'Case Study Title', required: true, initial: true },
	image: { 
		type: Types.Relationship, 
		label: 'Background Image', 
		ref: 'Image', 
		many: false
	},
	byline: { type: Types.Markdown, label: 'Short Byline Under Header', required: true, initial: true },
	modalities: {
		type: Types.Relationship, 
		label: "Modalities Explored",
		ref: 'Activity'
	},
	phaseI: { type: Types.Markdown, label: 'Phase I Implementation', note: ''},
	phaseII: { type: Types.Markdown, label: 'Phase II Implementation', note: ''},
	funds: { type: Types.Markdown, label: 'Fund Allocation', note: ''},
	text: { type: Types.Markdown, label: 'Case Study Text', note: ''},
	logos: { 
		type: Types.Relationship, 
		label: 'Logo(s)', 
		ref: 'Image', 
		many: true
	},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
CaseStudy.defaultSort = '-createdAt';
CaseStudy.defaultColumns = 'name, updatedAt';
CaseStudy.register();
