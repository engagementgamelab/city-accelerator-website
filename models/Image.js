/**
 * City Accelerator Website
 * 
 * Image page Model
 * @module Image
 * @class Image
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Image = new keystone.List('Image', 
	{
		label: 'Images',
		singular: 'Image',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Image
 */
Image.add({

	name: { type: String, label: 'Image Title', note: 'Make it unique!',required: true, initial: true },
	image: { type: Types.CloudinaryImage, label: 'Image', note: 'Do not leave without uploading an image!'},
	link: {
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Image Link', 
		note: 'Only if the image redirects to a link', 
		many: false
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Methods
 * =============
 */
// Remove a link or image reference if removed from database
Image.schema.statics.removeRef = function(refId, callback) {

    Image.model.update({
             'link': refId
        },

        {
            $pull: {
                'link': refId
            }
        },

        {
            multi: false
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
Image.defaultSort = '-createdAt';
Image.defaultColumns = 'name, updatedAt';
Image.register();
