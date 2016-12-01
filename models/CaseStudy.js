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
	blurb: { type: Types.Markdown, label: 'Short Blurb Under Header', required: true, initial: true },
	text: { type: Types.Markdown, label: 'Case Study Text', note: ''},
	image: { 
		type: Types.Relationship, 
		label: 'Background Image', 
		ref: 'Image', 
		many: false
	},
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
