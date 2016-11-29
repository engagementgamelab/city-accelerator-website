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
		label: 'CaseStudies',
		singular: 'CaseStudy',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main CaseStudy
 */
CaseStudy.add({

	name: { type: String, label: 'Case Study Title', required: true, initial: true },
	blurb: { type: Type.Markdown, label: 'Short Blurb Under Header', required: true, initial: true },
	text: { type: Type.Markdown, label: 'Case Study Text', note: ''},
	images: { type: Type.Markdown, label: 'Image(s)', ref: 'Image',many: true}
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
CaseStudy.defaultSort = '-createdAt';
CaseStudy.defaultColumns = 'name, updatedAt';
CaseStudy.register();
