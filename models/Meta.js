/**
 * City Accelerator Website
 * 
 * Meta page Model
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
var Meta = new keystone.List('Meta', 
	{
		label: 'Meta Data',
		singular: 'Meta Data',
		track: true
		// autokey: { path: 'meta_key', from: 'name', unique: true }

		// nocreate: true
	});

/**
 * Model Fields
 * @main Meta
 */
Meta.add({
	name: { type: String, label: "Title", required: true, initial: true },
	description: { type: Types.Textarea, label: "Description", required: true, initial: true },
	metaSection: { type: String, label: "Section", note: "Needs to match the page's section. Capitalization matters!!"},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Model Registration
 */
Meta.defaultSort = '-createdAt';
Meta.defaultColumns = 'name, updatedAt';
Meta.register();
