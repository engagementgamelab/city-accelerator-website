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
	header: { type: Types.Textarea, label: "Header", note: 'Will display below the title.'},
	description: { type: Types.Markdown, label: "General About description"},
	programGoals: { type: Types.Markdown, label: "Program Goals"},
	aboutTheCohort: { type: Types.Markdown, label: "Articles About the Cohort"},
	aboutPublic: { type: Types.Markdown, label: "Articles About the Public Engagement Today"},
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
