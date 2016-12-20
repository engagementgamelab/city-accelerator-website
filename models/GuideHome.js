/**
 * City Accelerator Website
 * 
 * GuideHome page Model
 * @module GuideHome
 * @class GuideHome
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * GuideHome model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var GuideHome = new keystone.List('GuideHome', 
	{
		label: 'Guide Home Page',
		singular: 'GuideHome Page',
		track: true
		// autokey: { path: 'guide_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main GuideHome
 */
GuideHome.add({
	name: { type: String, default: 'Guide Home Page', hidden: true, required: true, initial: true },
	title: { type: Types.Markdown, label: 'Guide Home Page Title', required: true, initial: true }
	byline: { type: Types.Markdown, label: 'Page Byline', required: true, initial: true },
	buttons: { type: Types.TextArray, label: 'Buttons', note: 'These refer to the button text.'}
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Model Registration
 */
GuideHome.defaultSort = '-createdAt';
GuideHome.defaultColumns = 'name, updatedAt';
GuideHome.register();
