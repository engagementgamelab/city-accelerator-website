/**
 * City Accelerator Website
 * 
 * Toolkit page Model
 * @module Toolkit
 * @class Toolkit
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Toolkit model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Toolkit = new keystone.List('Toolkit', 
	{
		label: 'Toolkit Home Page',
		singular: 'Toolkit Home Page',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Toolkit
 */
Toolkit.add({

	name: { type: String, label: 'Toolkit Name', default: 'Toolkit', hidden: true, required: true, initial: true }
}, 'Home Page', {
	header: { type: Types.Markdown, label: 'Page Header'}, 
	builderTitle: { type: Types.Markdown, label: 'Builder Card Title Text'}, 
	builderText: { type: Types.Markdown, label: 'Builder Card Description Text'},
	builderButton: { type: String, label: "Builder Button Text" }, 
	browseTitle: { type: Types.Markdown, label: 'Browse Card Title Text'},
	browseText: { type: Types.Markdown, label: 'Browse Card Description Text'},
	browseButton: { type: String, label: "Browse Button Text" }
}, 'Category Information', {
	startTitle: { type: String, label: "Getting Started Title", default: 'Getting Started' },
	startBlurb: { type: Types.Markdown, label: "Getting Started Blurb" },
	planTitle: { type: String, label: "Project Planning Title", default: 'Project Planning' },
	planBlurb: { type: Types.Markdown, label: "Project Planning Blurb" },
	implementTitle: { type: String, label: "Implementation Title", default: 'Implementation' },
	implementBlurb: { type: Types.Markdown, label: "Implementation Blurb" },
	iterateTitle: { type: String, label: "Iteration Title", default: 'Getting Started' },
	iterateBlurb: { type: Types.Markdown, label: "Iteration Blurb" },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Toolkit.defaultSort = '-createdAt';
Toolkit.defaultColumns = 'name, updatedAt';
Toolkit.register();
