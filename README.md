knowitall.js
===========

A simple extension for painless HTML5 validations.


- [Installation](#installation)
- [Why](#story)
- [Goals](#goals)
- [Usage](#usage)
- [Included Constraints](#constraints)
- [Ideas](#ideas)
- [Contribute](#contribute)


<a name="installation"></a> Installation
----------------------------------------

Development Dependencies:

1. [NPM / Node](http://www.npmjs.org/)
1. [Bower](http://bower.io/)
1. [Grunt](http://gruntjs.com/)

Currently, you have to clone the repo - it will be pushed to bower soon.

Once cloned, `npm install` and `bower install`. Running `grunt` will build the current state of the project.


<a name="story"></a> The Story
------------------------------

We've all encountered him - the know-it-all correcting you *every* time you say anything even a little bit incorrect(ly). You can hardly get a word out without him pointing out the most seemingly insignificant detail about the specifics of how you failed to convey some simple information. 

I like that guy.

That's where knowitall.js comes in. knowitall is a library to make extending native browser validations easy. Let's be frank - HTML5 took huge steps forward in improving the semantic expression of HTML, but there's always room for improvement. 


<a name="goals"></a> Goals
--------------------------

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


<a name="usage"></a> Usage
--------------------------

Currently, the script requires [RequireJS](http://requirejs.org/) - this is going to be removed shortly and replaced with [Almond](https://github.com/jrburke/almond). As it stands, though, add the script tag for both RequireJS and KnowItAll to your page, and then run the following:

	require(['knowitall'], function(knowitall) {
		...
		});

This can be done at the top of the page, but it's better at the bottom of the page - this will ensure that all forms on the page are automatically registered with knowitall. Otherwise, you will need to manually register your form element(s):

	// inside the require callback
	knowitall.registerForm(document.getElementById('address-form'));

Now that your form is being watched, you can register your custom constraints to run against it. A constraint is made up of a string that runs against the element to see if it should be validated, a function that returns whether or not the element is valid, and an error message that should be set if it is not valid.

There are three ways to register a constraint:

1. By type (default - `knowItAll.register` is an alias of this method)
		
	knowitall.registerType('country', function(element) { 
		return allCountries.indexOf(element.value) >=0; 
	}, 'Please enter a valid country.');

	This allows us to use markup such as the following:

	<input type="country"/>
	<input class="knowitall-country"/>

1. By class

		knowitall.registerClass('country', function(element) { 
			return allCountries.indexOf(element.value) >=0; 
		}, 'Please enter a valid country.');

	This allows us to use markup such as the following:

		<input class="country"/>

1. By name

		knowitall.registerName('country', function(element) { 
			return allCountries.indexOf(element.value) >=0; 
		}, 'Please enter a valid country.');

	This allows us to use markup such as the following:

		<input type="name"/>

Instead of supplying an error message string, it is also possible to supply and error function that will allow us to use a bit more detail:

	knowitall.register('country', function(element) { ... }, function(element) { 
		return "'" + element.value + "' ain't a country I've heard of - do they speak English in '" + element.value + "'?"
		});

Now your form is set up to be automatically validated, and you will see native browser error messages of the form you've specified.

	
<a name="constraints"></a> Included Constraints
-----------------------------------------------

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


<a name="ideas"></a> More Interesting Ideas
-------------------------------------------

Simple validation is great, but things get much more interesting when you start considering the possibilities - perhaps you want to validate based on data from an AJAX request, or you want to validate multiple fields at one time as a group (city / state guarantees, password confirmations, etc.). With a javascript solution that interacts with the native browser interface, the possibilities are open.


<a name="contribute"></a> Contributing
--------------------------------------

I'm still working on getting issues up on Github, I've been managing it indepedently in Trello. If you have suggestions, feel free to post issues.

Fork the repo - I generally like to maintain something similar to [git flow](http://nvie.com/posts/a-successful-git-branching-model/), but it's not strict at this point. Just trying to ship it!