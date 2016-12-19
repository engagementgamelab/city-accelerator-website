/**
 * City Accelerator Website
 * 
 * Card page Model
 * @module Card
 * @class Card
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Card model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Card = new keystone.List('Card', 
	{
		label: 'Cards',
		singular: 'Card',
        sortable: true,
		track: true,
        map: { name: 'title'},
		autokey: { path: 'card_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Card
 */
Card.add({

	title: { type: String, label: 'Card Title', required: true, initial: true },
    text: { type: Types.Markdown, label: 'Card text'},
	category: {
        type: Types.Select, 
        label: 'Card Category', 
        options: 'IntroOne, IntroTwo, Getting Started, Project Planning, Implimentation, Iteration',
        note: 'There should only be one card per category.'
    },
    // links: {
    //     type: Types.Relationship, 
    //     ref: 'Link',
    //     label: 'Any Links',
    //     many: true
    // },
    createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Model Registration
 */
Card.defaultSort = 'category';
Card.defaultColumns = 'name, updatedAt';
Card.register();
