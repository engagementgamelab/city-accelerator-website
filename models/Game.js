/**
 * City Accelerator Website
 * 
 * Game page Model
 * @module Game
 * @class Game
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Game model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Game = new keystone.List('Game', 
	{
		label: 'Game Pages',
		singular: 'Game Page',
		track: true,
		autokey: { path: 'game_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Game
 */
Game.add({

	name: { type: String, label: 'Game Page Title', required: true, initial: true },
	text: { type: Types.Markdown, label: 'What is it?'},
	upperDescription: { type: String, label: 'Upper Description', required: true, initial: true },
	howToPlay: { type: Types.Markdown, label: 'How To Play?' },
	featOneTitle: { type: Types.Markdown, label: 'Feature One Title' },
	featOneDescription: { type: Types.Markdown, label: 'Feature One Decription' },
	featOneImage: { 
		type: Types.Relationship, 
		ref: 'Image', 
		many:false, 
		label: 'Feature One Image', 
		note: 'Square Format!!'
	},
	featTwoTitle: { type: Types.Markdown, label: 'Feature Two Title' },
	featTwoDescription: { type: Types.Markdown, label: 'Feature Two Decription' },
	featTwoImage: { 
		type: Types.Relationship, 
		ref: 'Image', 
		many:false, 
		label: 'Feature Two Image', 
		note: 'Square Format!!'
	},
	featThreeTitle: { type: Types.Markdown, label: 'Feature Three Title' },
	featThreeDescription: { type: Types.Markdown, label: 'Feature Three Decription' },
	featThreeImage: { 
		type: Types.Relationship, 
		ref: 'Image', 
		many:false, 
		label: 'Feature Three Image', 
		note: 'Square Format!!'
	},
	footerImage: { type: Types.CloudinaryImage, label: 'Footer Image'},
	purchaseLink: {
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Purchase Link',
		many: false
	},
	logo: {
		type: Types.Relationship, 
		ref: 'Image', 
		label: 'Logo',
		many:false
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

// /**
//  * Methods
//  * =============
//  */
// // Remove a link or image reference if removed from database
// Game.schema.statics.removeLinkRef = function(filterId, callback) {

//     Game.model.update({
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
Game.defaultSort = '-createdAt';
Game.defaultColumns = 'name, updatedAt';
Game.register();
