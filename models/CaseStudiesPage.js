/**
 * City Accelerator Website
 * 
 * CaseStudiesPage page Model
 * @module index
 * @class index
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * about model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CaseStudiesPage = new keystone.List('CaseStudiesPage', 
	{
		label: 'Case Studies Page',
		singular: 'Case Studies Page',
		track: true
		// nocreate: true
	});

/**
 * Model Fields
 * @main CaseStudiesPage
 */
CaseStudiesPage.add({
	name: { type: String, default: "Case Studies Page", hidden: true, required: true, initial: true },
	title: { type: Types.Textarea, label: "Title"},
	// header: { type: Types.Textarea, label: "Header"},
	text: { type: Types.Textarea, label: "Header Text"},
	caseStudies: { 
		type: Types.Relationship, 
		ref: 'CaseStudy', 
		filters: {
			enabled: true
		}, 
		many: true, 
		label: "Case Studies Available", 
		note: "Order is important!"
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
CaseStudiesPage.defaultSort = '-createdAt';
CaseStudiesPage.defaultColumns = 'name, updatedAt';
CaseStudiesPage.register();
