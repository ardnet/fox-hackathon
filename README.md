# Fox Hackathon Info

A small Node implementation that stores and retrieves (with an example) most popular video data.

*Note:* this is my first Node app, and as such shouldn't be an example for anything. I'm just documenting it for my team's benefit and on the super-off chance anyone finds this because it's public.

## dependencies

* [Heroku](https://toolbelt.heroku.com/ "Heroku Toolkit")
* [NodeJS](https://nodejs.org/en/ "NodeJS")


## Installing
* edit sample_env and replace with your db connection info and API Token
* `cp sample_env .env`

## Running Locally
Run `heroku local`
open 'localhost:5000' in a browser to see an example of fetching popular videos from the DB

## Deploying changes to Heroku

``` bash
git remote add heroku https://git.heroku.com/rocky-sierra-19135.git
git push heroku master
heroku open
```

# API Documentation:

# TODO:
* Add API Authentication (via Token)
* Add some way to automatically create database table schema on project init.