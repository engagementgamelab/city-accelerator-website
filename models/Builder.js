/**
 * City Accelerator Website
 * 
 * Builder page Model
 * @module Builder
 * @class Builder
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Builder model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Builder = new keystone.List('Builder', 
	{
		label: 'Builder',
		singular: 'Builder',
		track: true
		// autokey: { path: '_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Builder
 */
Builder.add({

	name: { type: String, label: '', default: 'Project Builder', hidden: true, required: true, initial: true },
	introCardOne: { type: Types.Markdown, label: 'Intro Card One Text' },
	introCardTwo: { type: Types.Markdown, label: 'Intro Card Two Text', note: ''},
	startCard: { type: Types.Markdown, label: 'Getting Started Card Text', note: ''},
	planCard: { type: Types.Markdown, label: 'Project Planning Card Text', note: ''},
	implementCard: { type: Types.Markdown, label: 'Implementation Card Text', note: ''},
	iterateCard: { type: Types.Markdown, label: 'Iteration Card Text', note: ''},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Builder.defaultSort = '-createdAt';
Builder.defaultColumns = 'name, updatedAt';
Builder.register();
