# JavaScript Framewords

AngularJS and ExtJS are the two industry leading frameworks for Rich UI development. Cool webapp is a Rich UI multi page applications using both ExtJS and AngularJS.
`source:` [techferry](http://www.techferry.com/articles/ExtJS-vs-AngularJS.html)

## Overview:

**AngularJS** is declarative programming, we begin with adding AngularJS directives in plain HTML, configuring models, view configuration using templates and routes; and the framework takes care of final DOM creation. Since we are dealing with HTML, there is a direct interaction with HTML structure or DOM elements.

**ExtJS** is component based (Grid, Tree, Forms, Charts); the code begins with extending API classes and configuring models, customizing the presentation or behavior/events if needed, adding these components to containers/layouts. It follows object oriented principles and MVC pattern and direct interaction with DOM is rarely needed.

### SEO Friendliness

Most of the single page apps which work behind authentication need not be indexed for SEO. If you have some pages in your app which are public and which needs to be indexed, you can create them separately, either with static HTML/CSS or if you do need to use dynamic content, consider Ajax based SEO as described below. 

**Ajax based SEO:** For the indexing of dynamic / ajax-based single page web apps, all you have to do is to generate the additional static content so that when the crawlers access your page, they get easy access to that static content and when the users access your page, they see the app. To achieve this functionality you could either use some tools like Prerender.io: fully open-source or you have to set up the headless browser support in your web-server which is an additional effort.

### Deferred and Promises

Deferred and Promises break the complexities of asynchronous programming, separate out the synchronous and asynchronous world, remove the tight coupling between the two They are for asynchronous programming what try, catch and throw keywords are for synchronous programming.

### Dirty Checking

Dirty checking in nutshell: The framework compares the old value and new value and if they are different, fires the change event.

Read more: [AngularJS](/wiki/angular-js/readme), [ExtJS](/wiki/ext-js/readme)