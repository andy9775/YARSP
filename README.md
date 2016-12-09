# YARSP [![Build Status](https://travis-ci.org/andy9775/YARSP.svg?branch=master)](https://travis-ci.org/andy9775/YARSP) [![Coverage Status](https://coveralls.io/repos/github/andy9775/YARSP/badge.svg)](https://coveralls.io/github/andy9775/YARSP) [![codecov](https://codecov.io/gh/andy9775/YARSP/branch/master/graph/badge.svg)](https://codecov.io/gh/andy9775/YARSP) [![Code Climate](https://codeclimate.com/github/andy9775/YARSP/badges/gpa.svg)](https://codeclimate.com/github/andy9775/YARSP)
Yet Another React Starter Pack: A starter pack for ReactJS containing code splitting, testing and an api endpoint.

Prounounced as `yarr! + sp`

# What is it
YARSP is a starter pack / boiler plate package for ReactJS projects. It includes webpack and provides:
<ul>
  <li>Code splitting</li>
  <li>Supports SASS</li>
  <li>Dynamic route loading</li>
  <li>Structure includes an API end point</li>
  <li>Functions and helpers to create testable code</li>
  <li>ES2015</li>
  <li>Code Coverage (mocha, sinon, chai, istanbul, enzyme)</li>
  <li>continuous integration</li>
  <li><a href="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/">Isomorphic</a>/Universal javascript</li>
</ul>

# Scripts
| **Script**                | **Explanation**                                                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run dev`             | Start the development server. Includes Hot Module Reloading (HMR) - just change a react component and watch the page update automatically. |
| `npm start`               | Build the app and start the production server. All ES2015 code is run through babel and converted to ES5 and run through webpack.          |
| `npm test`                | Run tests                                                                                                                                  |
| `npm run build`           | Run the build scripts for the application. Runs babel and webpack scripts.                                                                 |
| `npm run prod`            | Run the app in production mode by building it and starting the express server                                                              |
| `npm run make-dir:build`  | Create the `./build` directory if it doesn't exist. `./build` holds the babel output.                                                      |
| `npm run clean-dir:build` | Clean the `./build` directory if it exists, else create it.                                                                                |
| `npm run make-dir:dist`   | Create the `./public/dist` directory. `./public/dist/` holds the webpack output.                                                           |
| `npm run clean-dir:dist`  | Clean the `./public/dist` directory, else create it.                                                                                       |
| `npm run babel`           | Run babel on the application to convert ES2015 to ES5.                                                                                     |
| `npm run pack`            | Run webpack on the application.                                                                                                            
Typicall only `npm start`, `npm run dev` and `npm test` should be run - all other scripts are called by those three.

# Configuration
###### Environment Variables
| **Environment variable** 	| **Default production value** 	| **Default development value** 	| **Explanation**                                                                                                           	| **Type**      	| **Environment** 	|
|--------------------------	|------------------------------	|-------------------------------	|---------------------------------------------------------------------------------------------------------------------------	|---------------	|-----------------	|
| HMR_PORT                 	| --                         	| 3001                          	| Port to bind hot module reloading to.                                                                                     	| Number        	| Development     	|
| SERVER_PORT              	| 3000                         	| 3000                          	| Which port the node server should bind to (production and development setting)                                            	| Number        	| All             	|
| NODE_ENV                 	| NONE                         	| NONE                          	| Specify operating environment. Expects 'production', 'development', or 'test'                                             	| String        	| All             	|
| SERVE_STATIC             	| false                        	| true                          	| Specify if express should serve static pages. If false a proxy like nginx should be responsible for service static pages. 	| bool          	| Production      	|

# Examples
Currently a simple todo app is built with a very simple API endpoint as well as a home page and about page as a proof of use. Advanced apps will (and should) expand on the current layout and configuration.


# Q & A
You have development dependencies inside of your production dependencies list - what gives?
>This allows you to build the app on the server without having to move around two sets of code - ES2015 and ES5. By having one bit of code in version control, ES2015, and building the production code via babel it makes your version control files smaller since your not moving around duplicate files (classes, functions, variables, etc.). The application is also structured to build the resulting production files when run in production mode. While this goes against NPM's guidelines, we are not publicly distributing our app via NPM - therefore its ok.<br><br> There is also the option of creating a script which installs all of our devDependencies, builds the app (transpiles ES2015), uninstalls the devDependencies and continues the start process. The downside of this is the need to install **all** of your devDependencies which increases build times.<br><br>In an ideal world NPM would have an `npm setup` command with `setup` dependencies. This would be run before `npm start` and would install all setup dependencies prior to running, and uninstall them after running if a setup script is defined.

What, no gulp/grunt?
>Gulp and Grunt are useful tools where and when they are needed - but NPM does everything that most web apps would need, so why add yet another tool and another file to maintain. If this is really a problem and your app really needs to use gulp/grunt and NPM won’t do what you need it to do, then you probably shouldn't be using a starter kit to begin with. Feel free however to pick and choose some parts from this starter pack! <a href="https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.ahpe1cj10">Further reading</a><br><br>A tool is just that, a tool. Use Gulp/Grunt if you have a complex testing or setup process - I have nothing against it - but start with npm scripts first and then graduate.


# TODO
<ul>
  <li>Upgrade HMR to React Hot Loader 3</li>
  <li>Enable nodemon and configure to reload server (endpoints, routes, etc.) while still retaining HMR features</li>
  <li>Styles?</li>
  <li>Update README and include examples</li>
  <li>Split reducers (webpack code splitting)</li>
</ul>
