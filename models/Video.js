/**
 * City Accelerator Website
 *
 * Video page parent Model
 * @module Video
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;
var slack = keystone.get('slack');

/**
 * @module Video
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Video = new keystone.List('Video', 
	{
		label: 'Videos',
		singular: 'Video',
        hidden: true,
		sortable: true,
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Person
 */
Video.add({
	data: { type: Types.Embedly, label: 'Video Embed Link', from: 'url', hidden: true},
	url: { type: String, label: 'Video URL', initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Hooks
 * =============
 */
Video.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    next();

});

Video.schema.post('save', function(next) {   

});


/**
 * Model Registration
 */
Video.defaultSort = 'sortOrder';
Video.defaultColumns = 'url, createdAt';
Video.register();

exports = module.exports = Video;
