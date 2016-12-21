/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.Footer);
keystone.pre('render', middleware.MainNav);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});

// TODO: Clickjacking protection
/*keystone.pre('routes', function(req, res, next) {

    // Allow certain domains to frame site
    res.setHeader('X-Frame-Options', 'ALLOW-FROM www.riskhorizon.org');

    next();
})*/

// Import Route Controllers
var routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

    // Views
    app.get('/', routes.views.index);
    app.get('/game', routes.views.game);
    app.get('/toolkit-builder', routes.views.toolkit);
    app.get('/toolkit', routes.views.toolkitHome);
    app.get('/about', routes.views.about);
    app.get('/case-studies', routes.views.caseStudies);
    app.get('/case-studies/:case_key', routes.views.caseStudy);
    // app.get('/:category_id', routes.views.category);
    app.get('/guide', routes.views.guidePages);
    app.get('/guide-home', routes.views.guideHome);
    // app.get('/guide/:guide_section/:guide_key', routes.views.guide);
    // app.get('/guide/:guide_section', routes.views.guide);
    
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
