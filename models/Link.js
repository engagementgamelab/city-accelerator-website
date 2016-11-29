/**
 * City Accelerator Website
 * 
 * Link page Model
 * @module Link
 * @class Link
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Link model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Link = new keystone.List('Link', 
	{
		label: 'Links',
		singular: 'Link',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Link
 */
Link.add({

	name: { type: String, label: 'Link text', required: true, initial: true },
	URL: { type: String, label: 'URL', required: true, initial: true },
	// image: { 
	// 	type: Types.Relationship, 
	// 	label: 'Image', 
	// 	note: 'Only upload image if the link is an image, NOT text', 
	// 	ref: 'Image',
	// 	many: false
	// }
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Link.defaultSort = '-createdAt';
Link.defaultColumns = 'name, updatedAt';
Link.register();
