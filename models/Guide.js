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
		track: true,
		autokey: { path: 'guide_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Guide
 */
Guide.add({

	name: { type: String, label: 'Guide Page Title', note: 'This is the page\'s link title', required: true, initial: true },
	header: { type: String, label: 'Page Header', required: true, initial: true },
	blurb: { type: Types.Markdown, label: 'Short Blurb Under Header', note: 'Keep it short!', required: true, initial: true },
	text: { type: Types.Markdown, label: 'Text', required: true, initial: true },
	section: { type: Types.Select, label: 'Guide Section', options: 'Intro, Summary, Calibrating, Charting', note: 'Only One Guide Page should be assigned to Intro and Summary sections'},
	isSection: { type: Boolean, label: 'Is this page the first page of a section?', note: 'ie: Executive Summary or Calibrating the Instruments'},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

// /**
//  * Methods
//  * =============
//  */
// // Remove a link or image reference if removed from database
// Guide.schema.statics.removeLinkRef = function(filterId, callback) {

//     Guide.model.update({
//             $or: [{
//                 'images'
//             }, {
//                 'links'
//             }]
//         },

//         {
//             $pull: {
//                 'images',
//                 'links'
//             }
//         },

//         {
//             multi: true
//         },

//         function(err, result) {

//             callback(err, result);

//             if (err)
//                 console.error(err);
//         }
//     );

// };

/**
 * Model Registration
 */
Guide.defaultSort = '-createdAt';
Guide.defaultColumns = 'name, updatedAt';
Guide.register();
