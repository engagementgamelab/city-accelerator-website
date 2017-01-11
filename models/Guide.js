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
		label: 'Guide Pages',
		singular: 'Guide Page',
		sortable: true,
		track: true,
		autokey: { path: 'guide_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Guide
 */
Guide.add({

	name: { type: String, label: 'Guide Page Link Name', note: 'This is the page\'s link title in the side navigation', required: true, initial: true },
	header: { type: String, label: 'Page Title', note: 'This is the title of this section', required: true, initial: true },	
	isSection: { type: Boolean, label: 'Is this page the first page of a section?', note: 'ie: Executive Summary or Calibrating the Instruments'},
	text: { type: Types.Markdown, label: 'Text for this page', note: '', required: true, initial: true },
	section: { type: Types.Select, label: 'Section', options: 'Calibrating, Charting, Going Places', note: 'Introduction or Executive Summary don\'t get a category!'},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Guide.defaultSort = 'sortOrder';
Guide.defaultColumns = 'name, isSection, section, updatedAt';
Guide.register();
