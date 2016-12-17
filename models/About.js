/**
 * City Accelerator Website
 * 
 * About page Model
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
var About = new keystone.List('About', 
	{
		label: 'About Page',
		singular: 'About Page',
		track: true
		// nocreate: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	name: { type: String, default: "About Page", hidden: true, required: true, initial: true },
	title: { type: Types.Textarea, label: "Title", required: true, initial: true },
	header: { type: Types.Textarea, label: "Header"},
	text: { type: Types.Textarea, label: "General Text"},
	goalsTitle: { type: String, label: "Goals Section Title"},
	goals: { type: Types.TextArray, label: "Program Goals"},
	aboutCohort: { type: Types.TextArray, label: "Articles About the Cohort"},
	aboutpublic: { type: Types.TextArray, label: "Articles About the Public Engagement Today"},
	partners: {
		type: Types.Relationship, 
		ref: 'Partner',
		label: "Partners"
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name, updatedAt';
About.register();
