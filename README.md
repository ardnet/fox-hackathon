# Fox Hackathon Info

A small Node implementation that stores and retrieves (with an example) most popular video data.

*Note:* this is my first Node app, and as such shouldn't be an example for anything. I'm just documenting it for my team's benefit and on the super-off chance anyone finds this because it's public.

## Dependencies:

* [Heroku](https://toolbelt.heroku.com/ "Heroku Toolkit")
* [NodeJS](https://nodejs.org/en/ "NodeJS")


## Installing:
* Config vars for this app [Can be found here](https://dashboard.heroku.com/apps/rocky-sierra-19135/settings)
* Edit sample_env and replace with this projects config vars.
* `cp sample_env .env`
* `npm install`

## Running Locally:
Run `heroku local`
open 'localhost:5000' in a browser to see an example of fetching popular videos from the DB.

## Deploying changes to Heroku:

``` bash
git remote add heroku https://git.heroku.com/rocky-sierra-19135.git
git push heroku master
heroku open
```

## API Documentation:

## TODO:
* Add some way to automatically create database table schema on project init.