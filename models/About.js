/**
 * City Accelerator Website
 * 
 * About page Model
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
var About = new keystone.List('About', 
	{
		label: 'About Page',
		singular: 'About Page',
		track: true
		// nocreate: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	name: { type: String, default: "About Page", hidden: true, required: true, initial: true },
	title: { type: Types.Textarea, label: "Title", required: true, initial: true },
	header: { type: Types.Textarea, label: "Header", note: 'Will display below the title.'},
	headerImages: { type: Types.CloudinaryImages, label: 'Header Images', note: 'These display below header.'},
	images: { type: Types.CloudinaryImages, label: 'Images', note: 'These display below about blurb.'},
	description: { type: Types.Markdown, label: "General About description" },
	programGoals: { type: Types.Markdown, label: "Program Goals" },
	aboutTheCohort: { type: Types.Markdown, label: "Articles About the Cohort" },
	aboutPublic: { type: Types.Markdown, label: "Articles About the Public Engagement Today" },
	partners: {
		type: Types.Relationship, 
		ref: 'Partner',
		label: "Partners",
		many: true
	},
	aboutCredits: { type: Types.Markdown, label: "credits" },
	aboutContact: { type: Types.Markdown, label: "contact" },

	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Methods
 * =============
 */
// Remove a link or image reference if removed from database
About.schema.statics.removeRef = function(refId, callback) {

    About.model.update({
             'partner': refId
        },

        {
            $pull: {
                'partner': refId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name, updatedAt';
About.register();
