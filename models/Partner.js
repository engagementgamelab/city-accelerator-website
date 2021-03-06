/**
 * City Accelerator Website
 * 
 * Partner page Model
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
var Partner = new keystone.List('Partner', 
	{
		label: 'Partners',
		singular: 'Partner',
		track: true
	});

/**
 * Model Fields
 * @main Partner
 */
Partner.add({
	name: { type: String, label: "Partner Name", required: true, initial: true },
	description: { type: Types.Markdown, label: "Description"},
	image: { type: Types.CloudinaryImage, label: "Partner Logo"},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

Partner.relationship({ ref: 'About', refPath: 'partners' });


/**
 * Model Registration
 */
Partner.defaultSort = '-createdAt';
Partner.defaultColumns = 'name, updatedAt';
Partner.register();
