![AngularJS Logo](http://www.techferry.com/articles/images/angular-logo.jpeg "AngularJS Logo")
# AngularJS

* HTML enhanced for web apps!

* Fully extensible and works well with other libraries.

* Open-source JavaScript framework, maintained by Google

* Declarative programming approach

## We use AngularJS because:

* Smaller Footprint is required. For more details, see the Performance Comparison Stats.

* Responsive design is a requirement for our application.

* Our organization find value in automated testing and automated testing is a part of your development culture.
It would be cheaper to integrate existing 3rd-party components which are free.

* Our team is comfortable with CSS and dealing with cross-browser compatibility issues.

* We manage integration of new releases and bug fixes from the selected 3rd-party libraries throughout the application's development lifecycle.

### Application Design:
* AngularJS is HTML enhanced for web apps.

* It is described as a 'Model-View-Whatever' framework in which it does not prescribe a specific application architecture or set of patterns. However it is sufficiently flexible to support popular patterns such as  Model-View-Controller or Model-View-ViewModel.

* It is module based. It autowires the dependency modules within the html elements.

### Components

What AngularJS does not address is a rich library of user interface components.

However, there are a number of open source and commercial components which provide integration for AngularJS including AngularUI, AngularUI Bootstrap, Kendo (and Angular-Kendo), Wijmo and others.

### Routing:

* AngularJS router wires together controllers, view templates, and the current URL location in the browser. Using this feature we can implement deep linking. 

* Deep linking consists of using a hyperlink that links to a specific, generally searchable or indexed piece of web content on a website. It lets us utilize the browser's history (back and forward navigation) and browser's bookmarks feature.

### Two way data binding:

Two way data binding in AngularJS is executed with the scope which is basically a model nested in a prototypal inheritance tree of scopes (models).

**Cons:**
Application becomes laggy if there are 2000-3000 bindings in a template. 

*Bindonce* is a great way to minimize the number of watches when most of the data presented in your page, once rendered, are immutable and you need not keep watching them for changes.

### Testability:

* AngularJS was designed from the ground up to create testable applications.

* It supports all three facets of automated testing: unit, integration and functional testing.

* The AngularJS team has also developed its own Karma test runner. In addition, 3rd party tool Protractor is the end to end test framework for Angular apps.

### SEO Friendliness:

* AngularJS seo with Prerender.io: When a crawler visits your page at hashbang url, the Prerender service will check and see if it has a snapshot or already rendered page for that URL, if yes, it will send it to the crawler, if not, it will render a snapshot on the fly and send the rendered HTML to the crawler for correct indexing.

* Alternatively, you can also build support for hashbang URLs which may require you to set-up your web-server to summon-up the headless html browser.

### Mobile Solutions:

* AngularJS can be used to develop responsive web apps / websites although all the angular modules are not responsive.

* To develop the cross platform hybrid applications, integrate AngularJS with:

  * Trigger.io

  * Ionic Framework - Advanced Html5 hybrid mobile framework and optimized for AngularJS

  * Cordova/Phonegap

### Dom Approach:

Directives are linked in a Depth-First, Bottom-Up approach to the DOM tree. Controllers are linked in a top-down manner.

### Deferred and Promises:

AngularJS offers an implementation of the Q API for Deferred and Promises.

### Deferred bootstrap:

Bootstrap means the initialization process. Deferred bootstrap is to make a delay in the bootstrap process to mock out the heavy dependencies or for the instrumentation purposes. Deferred bootstrap is primarily introduced to allow end to end tests. 

Although deferred bootstrap has no value in the developement and testing of most single page applications, yet it serves its value in AngularJS applications' end to end testing. Some javascript test runners such as Batrang and Angular Scenario Runner (which are developed by AngularJS team for the end to end testing of the angularJS applications) require deferred bootstrap.

* Batrang is a new Chrome extension, recommended by the angular team, provides the tools to address performance bottlenecks, visualize and debug applications.

* AngularJS Batarang and Angular Scenario Runner require Deferred Bootstrap feature to hook into angular's bootstrap process and sneak in more modules into the DI registry which can replace or augment DI services for the purpose of instrumentation or mocking out heavy dependencies.

### Dirty Checking:

* Angular uses the Digest Cycle to execute the dirty checking.

* The digest cycle is all about reacting to changes in data.

* With Angular api, you do not need to manaually call the digest cycle, angular internally fires digest cycle followed by updation of the dom but from third party api, you need to call $apply method to enter the digest cycle.

* Changes are reflected in the real data in UI as soon as the digest cycle is finished.

* The dirty checking is done asynchronously.

* Generally what happens is, the browser's event-loop waits for an event to arrive, as long as it recives an event, it emits the event on the input controls which is then captured in the corresponding directive's event handler which calls apply function, to enter into Angular execution context, with function/expression (the work you wish to do in Angular execution context) as parameter.

* **Model mutation** is then executed in apply function with all the error handling followed by the firing of the digest cycle in its finally phase.

* In all the Dirty Cycle mechanisms, all the watchers in the watch list are iterated and in each iteration watch expression in current scope is evaluated, old and new value of scope is compared and if both values differ, then the corresponding listener of the watcher function is fired which upon execution calls digest cycle again with one of the two possilities:

  * If the listener function does not modify the scope then in the running digest turn, model is declared as stable and digest loop is finished followed by the browser re-painting of the DOM node which was dirty.

  * If scope is modified, then it will fire the other listeners, so the watchers keep re-running until until no more watchers are fired and a max limit of 10 iterations is reached when $digest will throw 'Maximum iteration limit exceeded' to prevent infinite loops.

* This dirty checking is done asynchronously.

**Three mechanisms of Dirty Checking:**

Reference-Based Dirty-Checking: The old value is compared to the new with the strict equality operator === which detect the new and old values are the same "physical" object. It is the most efficient both in terms of computation and memory, since it doesn't do copying or traversal. It merely keeps a reference to the value around for comparison.

Value-Based Dirty-Checking: It performs a deep-object-tree comparison.This means that within each $digest cycle, AngularJS will check to see if the new and old values have the same structure.

Collection-based dirty checking: It works by comparing physical object references. Collection watchers keep an internal copy of the array or object, and traverse the old and new values in each digest cycle, checking for changes using the strict equality operator === i.e. unlike the reference based dirty checking, it goes one-level deep and performs an additional, shallow reference check of the top level items in the collection.

**Cons of dirty checking:**

Application becomes laggy if there are 2000-3000 watches in a template.

Although anything faster than 50ms is imperceptible to humans and you can't really show more than about 2000 pieces of information to a human on a single page because anything more than that is really a bad UI and humans can't process this anyway, yet while building any sort of widget or data grid with two-way binding you may easily hit 2000 bindings without the bad UI.

**Bindonce** is a great way to minimize the number of watches when most of the data presented in your page, once rendered, are immutable and you need not keep watching them for changes.

**Watcher:**

By default all the model data that is bound to UI are being watched upon i.e. they all have a watcher registered in the watch list, a collection used by digest cycle for the dirty checking. You can also attach a watcher to the scope by using $watch function. A watcher has two functions: A watch function or a watch expression, which specifies the piece of data you are interested in. A listener function which will be called whenever that data changes. 

**Asynchronous nature of dirty cycle:**

Assignment such as $scope.username="angular" will not immediately cause a $watch to be notified, instead the $watch notification is delayed until the $digest phase. This delay is desirable, since it coalesces multiple model updates into one $watch notification as well as it guarantees that during the $watch notification no other $watches are running. If a $watch changes the value of the model, it will force additional $digest cycle.

### Getting started:

https://github.com/yeoman/generator-angular
yeoman/generator-angular

https://github.com/ngbp/ngbp
A sophisticated build management system for web apps (formerly ng-boilerplate). Created by @joshdmiller
http://bit.ly/ngBoilerplate