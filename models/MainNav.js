/**
 * City Accelerator Website
 * 
 * MainNav page Model
 * @module index
 * @class index
 * @author Erica Salling
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
var MainNav = new keystone.List('MainNav', 
	{
		label: 'Main Navigation',
		singular: 'Main Navigation',
		track: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main MainNav
 */
MainNav.add({
	name: { type: String, default: "Nav Title", label: 'Navigation Title Text', required: true, initial: true },
	description: { type: Types.Markdown, label: "Description",  initial: true, required: true },
	links: { 
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Links', 
		many: true, 
		note: 'Order is important!'
	}, 
	logo: {
		type: Types.Relationship, 
		ref: 'Image', 
		label: 'Logo', 
		many: false
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});



/**
 * Model Registration
 */
MainNav.defaultSort = '-createdAt';
MainNav.defaultColumns = 'name, updatedAt';
MainNav.register();
