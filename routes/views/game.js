/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Game page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Game
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Game = keystone.list('Game'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    // locals.section = '';

    view.on('init', function(next) {

        var queryGame = Game.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        queryGame.exec(function(err, resultGame) {
            if (err) throw err;

            if(resultGame === null)
                return res.notfound('Cannot find that game', 'Sorry, but it looks like the game page you were looking for does not exist!');

            locals.game = resultGame;

            next();

        });
    });

    // Render the view
    view.render('game');

};
