7.0 Style Guide
===============

Current location of style guide demo page: http://devbox.spredfast.com/style-guide/ 
Current branch: develop
Current QA Env: QA13 

** Moving components from 7.0 to the styleguide repo **

For any existing or new component that needs to be shared amongst projects, they will need to be added to the styleguide repo.  
Add code to the /src/js/spredfast dir.  
If the component is being migrated from 7.0, make sure to delete the existing component from 7.0 after the styleguide is updated.

** To-Dos for sf-styleguide repo: **

* Move spredfast.scss out of style guide and into jmvc/spredfast_app; update import urls
* Move non-style guide scss partials out of style guide and into legacy_css directory in jmvc/spredfast_app
- These were created early on in the 7.0 project to accomodate legacy style sheets for non jmvc modules that didn't have a directory of their own in jmvc/
* Remove non-style guide scss partials from sf-styleguide repo; already correctly moved in sf-webapp
* Delete bootstrap directory - this will be populated by running the production build script using the files in the styleguide repository
* Update Readme and this page with process for updating style guide version and making style guide changes (getting signoff from UX and UI prior to making changes, most importantly, and blocking one-off changes)
* Noah added ${jmvc} import path in build.gradle, so we should be able to remove ../../ from all paths in spredfast.scss referencing a directory in the jmvc root
* Group imported files properly in spredfast.scss as some files like publishing-schedule.scss are grouped with style guide files
* Solidify how we structure where scss files live: root of canJS module directory?  What about legacy files?  Currently we put those in spredfast_app/sass/legacy

** Style Guide Demo Page Changes: **
Add Delayed Dropdown example to demo page - Jared
Move style-guide demo page out of php - Phil or Jared
Cleanup: Remove one-line css classes like margin-left-5 which adds one css rule, margin-left: 5px;

Process For Making A Change In The Styleguide

1. Clone the styleguide repo.  ssh://git@stash.spredfast.com:7999/dev/sf-styleguide.git   (Current path can be found in Stash)
2. Add your changes in a feature branch created from master on sf-styleguide.
Adding new icons will go in src/sass/spredfast/_sprite_icons.scss.
3. If it is your first time making a commit in the sf-styleguide repository there are several additional steps, otherwise you can proceed to step 4.
  a. Note the username and password from ~/.m2/settings.xml.
  b. Create a new file, ~/.gradle/gradle.properties, and using the username and password from above copy the following into the file:

```
spredfastRepoUsername=<username>
spredfastRepoPassword=<password>
```

  c. Create a new file, ~/.gradle/init.gradle, which will contain the following:

```
allprojects {
        buildscript {
                repositories {
                        mavenLocal()
                }
        }

        repositories {
                mavenLocal()
        }
}
```
4. Test the styleguide locally.:
  a. In sf-styleguide, run ./gradlew install
  b. In sf-webapp/jmvc/build.gradle, change the dependency styleguide to the current SNAPSHOT version e.g., "com.spredfast.app.ui:styleguide:0.0.4-SNAPSHOT".  This will point to the local version of the snapshot from sf-styleguide, so you can test your changes locally in sf-webapp.
  c. Restart ./gradlew run
  d. Make sure your changes are there.
  e. You may run into the following error when running ./gradlew run:

```
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring root project 'jmvc'.
> Could not resolve all dependencies for configuration ':classpath'.
   > Could not download artifact 'org.slf4j:slf4j-api:1.7.5@jar'
      > Artifact 'org.slf4j:slf4j-api:1.7.5@jar' not found.
```

If this happens you just need to run the following: 

```
rm -rf ~/.m2/repository/org/slf4j
```

5. Once you have tested your changes, please submit a pull request from your task branch to master in the sf-styleguide repository.