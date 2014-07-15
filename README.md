knowitall.js
===========

A simple extension for painless HTML5 validations.


Installation
------------

Development Dependencies:

1. [NPM / Node](http://www.npmjs.org/)
1. [Bower](http://bower.io/)
1. [Grunt](http://gruntjs.com/)

Currently, you have to clone the repo - it will be pushed to bower soon.

Once cloned, `npm install` and `bower install`. Running `grunt` will build the current state of the project.


The Story
---------

We've all encountered him - the know-it-all correcting you *every* time you say anything even a little bit incorrect(ly). You can hardly get a word out without him pointing out the most seemingly insignificant detail about the specifics of how you failed to convey some simple information. 

I like that guy.

That's where knowitall.js comes in. knowitall is a library to make extending native browser validations easy. Let's be frank - HTML5 took huge steps forward in improving the semantic expression of HTML, but there's always room for improvement. 


Goals
-----

My primary goal with knowitall was to make registering custom validation constraints quick, easy, and invisible from the perspective of a user. Also, I wanted the library to be painless to use. That introduced the following limitations:

1. Clean registration of constraints
	
		// currently needs requirejs, will be removed soon
		var knowitall = require('knowitall');

		var isConfident = function(element) {
			return element.value > 5;
		}

		knowitall.register('confidence', isConfident, 'You need to be more confident.');

	The code above would let us validate the following input:

		<input type="confidence" value="1"/> <!-- would display 'You need to be more confident.' -->

1. Browser-native implementation integration of error messages

	There are **no** markup requirements or DOM manipulations in this library - you can work with a knowitall error message in exactly the same way as you work with a native browser error message. Consequently, the code that you use for native validations will work immediately for your custom validations.

1. Must support all HTML5 validation specs
	
	- `novalidate` and `formnovalidate`
	- `setCustomValidity` and `validity` standards

1. It's just Javascript

	The library does not rely on Jquery, YUI, or any other monolithic libraries. It's only *potential* dependency is [H5F](https://github.com/ryanseddon/H5F), an HTML5 validation polyfill for old browsers. That said, the library is available built without H5F included if you are only targeting modern browsers.

	
Included Constraints
--------------------

1. Credit Card Numbers

	This alone was of huge value to me - immediately, any payment form becomes much more responsive to the needs of the user, with little to no effort on the part of the developer.

		<input type="creditcard"/>

Considered additions:

1. Zip Code: `<input type="zipcode"/>`

1. Names: 
	- `<input type="fullname"/>`
	- `<input type="firstmiddlelastname"/>`
	- `<input type="firstname"/>`
	- etc.


More Interesting Ideas
----------------------

Simple validation is great, but things get much more interesting when you start considering the possibilities - perhaps you want to validate based on data from an AJAX request, or you want to validate multiple fields at one time as a group (city / state guarantees, password confirmations, etc.). With a javascript solution that interacts with the native browser interface, the possibilities are open.


Contributing
------------

I'm still working on getting issues up on Github, I've been managing it indepedently in Trello. If you have suggestions, feel free to post issues.

Fork the repo - I generally like to maintain something similar to [git flow](http://nvie.com/posts/a-successful-git-branching-model/), but it's not strict at this point. Just trying to ship it!