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
		label: 'Toolkit Pages',
		singular: 'Toolkit Page',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Toolkit
 */
Toolkit.add({

	name: { type: String, label: 'Toolkit Name', default: 'Toolkit', hidden: true, required: true, initial: true },
	startTitle: { type: String, label: "Getting Started Title", default: 'Getting Started' },
	startBlurb: { type: Types.Markdown, label: "Getting Started Blurb" },
	planTitle: { type: String, label: "Project Planning Title", default: 'Project Planning' },
	planBlurb: { type: Types.Markdown, label: "Project Planning Blurb" },
	implementTitle: { type: String, label: "Implementation Title", default: 'Implementation' },
	implementBlurb: { type: Types.Markdown, label: "Implementation Blurb" },
	iterateTitle: { type: String, label: "Iteration Title", default: 'Getting Started' },
	iterateBlurb: { type: Types.Markdown, label: "Iteration Blurb" },
	builderButton: { type: String, label: "Builder Button Text" },
	// category: {type: Types.Select, label: 'Toolkit Category', options: 'start, plan, impliment, iterate', required:true, initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Toolkit.defaultSort = '-createdAt';
Toolkit.defaultColumns = 'name, updatedAt';
Toolkit.register();
