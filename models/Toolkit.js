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
	startBlurb: { type: Types.Markdown, label: "Getting Started Blurb" },
	planBlurb: { type: Types.Markdown, label: "Project Planning Blurb" },
	implimentBlurb: { type: Types.Markdown, label: "Implimentation Blurb" },
	iterateBlurb: { type: Types.Markdown, label: "Iteration Blurb" },
	// category: {type: Types.Select, label: 'Toolkit Category', options: 'start, plan, impliment, iterate', required:true, initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Toolkit.defaultSort = '-createdAt';
Toolkit.defaultColumns = 'name, updatedAt';
Toolkit.register();
