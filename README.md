# YARSP
Yet Another React Starter Pack: A starter pack for ReactJS containing code splitting, testing and an api endpoint.

Prounounced as `yarr! + sp`

# What is it
YARSP is a starter pack / boiler plate package for ReactJS projects. It includes webpack and provides:
<ul>
  <li>Code splitting</li>
  <li>Supports SASS</li>
  <li>Structure includes an API end point</li>
  <li>Tests and helpers to create testable code</li>
  <li>ES2015</li>
  <li><a href="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/">Isomorphic</a>/Universal javascript</li>
</ul>

# Q & A
You have development dependencies inside of your production dependencies list - what gives?
>This allows you to build the app on the server without having to move around two sets of code - ES2015 and ES5. By having one bit of code in version control, ES2015, and building the production code via babel it makes your version control files smaller since your not moving around duplicate files (classes, functions, variables, etc.). The application is also structured to build the resulting production files when run in production mode. While this goes against NPM's guidelines, we are not publicly distributing our app via NPM - therefore its ok.<br><br> There is also the option of creating a script which installs all of our devDependencies, builds the app (transpiles ES2015), uninstalls the devDependencies and continues the start process. The downside of this is the need to install **all** of your devDependencies which increases build times.<br><br>In an ideal world NPM would have an `npm setup` command with `setup` dependencies. This would be run before `npm start` and would install all setup dependencies prior to running, and uninstall them after running if a setup script is defined.

What, no gulp/grunt?
>Gulp and Grunt are useful tools where and when they are needed - but NPM does everything that most web apps would need, so why add yet another tool and another file to maintain. If this is really a problem and your app really needs to use gulp/grunt and NPM won’t do what you need it to do, then you probably shouldn't be using a starter kit to begin with. Feel free however to pick and choose some parts from this starter pack! <a href="https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.ahpe1cj10">Further reading</a><br><br>A tool is just that, a tool. Use Gulp/Grunt if you have a complex testing or setup process - I have nothing against it - but start with npm scripts first and then graduate.
