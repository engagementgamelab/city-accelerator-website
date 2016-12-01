/**
 * City Accelerator Website
 * 
 * Activity page Model
 * @module Activity
 * @class Activity
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Activity model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Activity = new keystone.List('Activity', 
	{
		label: 'Activities',
		singular: 'Activity',
		track: true,
		autokey: { path: 'activity_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Activity
 */
Activity.add({

	name: { type: String, label: 'Activity Title', required: true, initial: true },
    length: { type: String, label: 'Activity Length' },
	category: {type: Types.Select, label: 'Activity Category', options: 'start, plan, impliment, iterate', required:true, initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
},
'Activity Card (Small)', {

    blurb: {
        type: Types.Markdown,
        label: 'Blurb'
    },
    thumbnail: {
        type: Types.Relationship,
        label: 'Card Image',
        ref: 'Image',
        many: false
    }
},
'Activity Page (Big)', {
    question: {
        type: Types.Markdown, 
        label: 'Question for Project Builder'
    }
    why: {
        type: Types.Markdown,
        label: 'Rationale'
    },
    steps: {
        type: Types.Markdown,
        label: 'Steps'
    },
    tips: {
        type: Types.Markdown,
        label: 'Tips'
    },
    materials: {
        type: Types.Markdown,
        label: 'Suggested Materials'
    }
},
'Resources', {
	images: {
		type: Types.Relationship,
        label: 'Resource Images',
        ref: 'Image',
        many: true
	}, 
	links: {
		type: Types.Relationship,
	    label: 'Resource Links',
        ref: 'Link',
	    many: true
    },
	vidoes: {
		type: Types.Relationship,
        ref: 'Video',
        label: 'Resource Videos',
        many: true
	}
});

/**
 * Model Registration
 */
Activity.defaultSort = '-createdAt';
Activity.defaultColumns = 'name, updatedAt';
Activity.register();
