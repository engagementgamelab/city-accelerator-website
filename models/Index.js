/**
 * City Accelerator Website
 * 
 * Index page Model
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
 * index model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Index = new keystone.List('Index', 
	{
		label: 'Home Page',
		singular: 'Home Page',
		track: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Index
 */
Index.add({
	name: { type: String, default: "Home Page", hidden: true, required: true, initial: true },
	rationale: { type: Types.Markdown, label: "Homepage Rationale",  initial: true, required: true },
	header: { type: Types.Markdown, label: "Header",  initial: true, required: true },
	theToolkit: { type: Types.Markdown, label: "The Toolkit Blurb",  initial: true, required: true }, 
	theGuide: { type: Types.Markdown, label: "The Guide Blurb",  initial: true, required: true },
	theCaseStudies: { type: Types.Markdown, label: "The Case Studies Blurb",  initial: true, required: true },
	theGame: { type: Types.Markdown, label: "The Game Blurb",  initial: true, required: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Index.defaultSort = '-createdAt';
Index.defaultColumns = 'name, updatedAt';
Index.register();
