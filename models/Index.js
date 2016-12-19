/**
 * City Accelerator Website
 * 
 * Index page Model
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
 * index model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Index = new keystone.List('Index', 
	{
		label: 'Home Page',
		singular: 'Home Page',
		track: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Index
 */
Index.add({
	name: { type: String, default: "Home Page", hidden: true, required: true, initial: true },
	title: { type: Types.Markdown, label: "Homepage Title",  initial: true, required: true },
	header: { type: Types.Markdown, label: "Homepage Header Description",  initial: true, required: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

}, 
'The Toolkit Card', {
	theToolkit: { type: Types.Markdown, label: "The Toolkit Blurb",  initial: true, required: true },
	toolkitLink: { type: Types.Markdown, label: "Text for the toolkit page link",  initial: true, required: true }
}, 
'The Guide Card', {
	theGuide: { type: Types.Markdown, label: "The Guide Blurb",  initial: true, required: true },
	guideLink: { type: Types.Markdown, label: "Text for the guide page link",  initial: true, required: true }
},
'The Case Studies Card', {
	theCaseStudies: { type: Types.Markdown, label: "The Case Studies Blurb",  initial: true, required: true },
	caseLink: { type: Types.Markdown, label: "Text for the case studies page link",  initial: true, required: true }
},
'The Game Card', {
	theGame: { type: Types.Markdown, label: "The Game Blurb",  initial: true, required: true },
	gameLink: { type: Types.Markdown, label: "Text for the game page link",  initial: true, required: true }
});

/**
 * Model Registration
 */
Index.defaultSort = '-createdAt';
Index.defaultColumns = 'name, updatedAt';
Index.register();
