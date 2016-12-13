/**
 * City Accelerator Website
 * 
 * Score page Model
 * @module Score
 * @class Score
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Score model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Score = new keystone.List('Score', 
	{
		label: 'Scores',
		singular: 'Score',
        sortable: true,
		track: true,
        map: { name: 'title'},
		autokey: { path: 'score_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Score
 */
Score.add({

	title: { type: String, label: 'Score Title', required: true, initial: true },
    text: { type: Types.Markdown, label: 'Score text'},
	// category: {
 //        type: Types.Select, 
 //        label: 'Score Category', 
 //        options: 'IntroOne, IntroTwo, Getting Started, Project Planning, Implimentation, Iteration',
 //        note: 'There should only be one card per category.'
 //    },
    createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Model Registration
 */
Score.defaultSort = 'category';
Score.defaultColumns = 'name, updatedAt';
Score.register();
