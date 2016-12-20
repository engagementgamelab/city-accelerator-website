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
        sortable: true,
		track: true,
		autokey: { path: 'activity_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Activity
 */
Activity.add({

	name: { type: String, label: 'Activity Title', required: true, initial: true },
    order: { type: Number, label: 'Sort Order', note: 'This is per category, so each category will have activities with numbers 1-n, with n being the number of activies in that category.'},
    length: { type: String, label: 'Activity Length' },
	category: {type: Types.Select, label: 'Activity Category', options: 'Getting Started, Project Planning, Implementation, Iteration', required:true, initial: true },
    question: {
        type: Types.Markdown,
        label: 'Question',
        note: 'Appears both on small activity card, toolkit, and full screen activity modal'
    },
    icon: {
        type: Types.Relationship,
        label: 'Activity Icon',
        ref: 'Image',
        many: false
    },
    // toolImage: {
    //     type: Types.Relationship,
    //     label: 'Toolkit Card Image Background',
    //     ref: 'Image',
    //     many: false
    // },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
},
'Activity Page (Big)', {
    description: {
        type: Types.Markdown, 
        label: 'Description for Project Builder'
    },
    example: {
        type: Types.Markdown, 
        label: 'Example for Project Builder'
    },
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

Activity.schema.pre('remove', function(next) {

    var models = [ 'CaseStudy' ];

  // Remove resource from all that referenced it 
  _.each(models, function(model, index){

    console.log(model);
    keystone.list(model).model.removeRef(this._id, function(err, removedCount) {

        if(err)
            console.error(err);
    
        if(removedCount > 0)
            console.log("Removed " +  removedCount + " references to '"+ this._id + "'");

        });
  });
    

        next();

});


/**
 * Model Registration
 */
Activity.defaultSort = 'category';
Activity.defaultColumns = 'name, updatedAt';
Activity.register();
