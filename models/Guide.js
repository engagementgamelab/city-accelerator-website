/**
 * City Accelerator Website
 * 
 * Guide page Model
 * @module Guide
 * @class Guide
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Guide model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Guide = new keystone.List('Guide', 
	{
		label: 'Guide Pagess',
		singular: 'Guide Page',
		track: true,
		autokey: { path: 'guide_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Guide
 */
Guide.add({

	name: { type: String, label: 'Guide Page Title', note: 'Think is the page\'s link title', required: true, initial: true },
	header: { type: String, label: 'Page Header', required: true, initial: true },
	blurb: { type: Types.Markdown, label: 'Short Blurb Under Header', note: 'Keep it short!', required: true, initial: true },
	text: { type: Types.Markdown, label: 'Text', required: true, initial: true },
	section: { type: Types.Select, label: 'Guide Section', options: 'one, two, three' }
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Guide.defaultSort = '-createdAt';
Guide.defaultColumns = 'name, updatedAt';
Guide.register();
