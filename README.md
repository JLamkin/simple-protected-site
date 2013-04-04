Static Protected Site
=====================

A simple Node.js server for hosting a static site with HTTP Basic authentication and optional HTTPS requirement. 


Local Deployment
----------------

Clone the repository:

    git clone https://github.com/dlkinney/static-protected-site
    cd simple-protected-static-site

Install the dependencies:

    npm install
   
Setup the HTTP Basic authentication credentials:

    export SPS_USERNAME=johndoe
    export SPS_PASSWORD=supersecret

Put your static content in the `public/` directory.

Finally, run the server:

    node server.js


Heroku Deployment
-----------------

Clone the repository:

    git clone https://github.com/dlkinney/static-protected-site
    cd simple-protected-static-site

Put your static content in the `public/` directory _and commit it._

Create a Heroku application for the site:

    heroku app:create
    
Setup the HTTP Basic authentication credentials:

    heroku config:set \
        SPS_USERNAME=johndoe \
        SPS_PASSWORD=supersecret

Optionally, require SSL:

    heroku config:set SPS_FORCE_SSL=1

Finally, post the app:

    git push heroku master


