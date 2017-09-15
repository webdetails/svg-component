# Build Information

SVG Component is released through [github releases](https://github.com/blog/1547-release-your-software).

Release artifacts are created with [maven](https://maven.apache.org/) and uploaded to current or new releases.

## File Structure

This component has a maven like structure. Contents are divided over two main directories:
* **impl**, that holds all the implementation related files;
* **assemblies**, where all the final artfacts are made available;

Because this represents a CDE component we have two implementation paths: 
* one that represents the component's code on _/impl/component/src/main/javascript_;
* and another one that represents the sample, on _impl/sample-component/src/main/resources_.

This way, if you want to update the sample, or perform a code modification, you must update the files that lay on **impl** folder, choosing the correct sub-folder path.

This contents will eventually be _assembled_ into the second main directory, to create new artifacts for releases. 
The **assemblies** directory keeps the same paths that we built for _impl_:
* **assemblies/platform-plugin**, keeps the remaining resources for component's final package, and the final package for release purposes;
* **assemblies/cde-dashboard**, is where the final sample package will be available.

To update the _assemblies_ directory, and produce the .zip files to release, you have to build the solution. 

There is a third directory that could be usefull in the future: __marketplace_assets__ keeps track on marketplace entry specific contents, like his logo and sample screenshots. If you need to change any of this elements, remember that marketplace.xml should also be updated to reflect your changes.

### Add new version

If you are creating a new component release you problably want to change the component version - bear in mind that for Pentaho Marketplace be able to control the current installed version (and branch), versus the new versions available, we need to make sure that the version stated on the component's entry in marketplace.xml is the same exposed on component's **version.xml** file.

To automatize this behaviour, we added the control to maven. So, you need to update the followin pom files, with the new version value:

* /pom.xml
* /impl/pom.xml
* /impl/component/pom.xml
* /impl/sample-component/pom.xml
* /assemblies/pom.xml
* /assemblies/platform-plugin/pom.xml
* /assemblies/platform-plugin/pom.xml
* /assemblies/cde-dashboard/pom.xml
* /assemblies/cde-dashboard/pom.xml

## Build

### Before you start

New releases imply new plugin artifacts. New plugin artifacts will require update on svg component entry within marketplace.xml, to became available on Pentaho Marketplace and eventually be consumed by users. You can achieve this by forking [Pentaho Marketplace project](https://github.com/pentaho/marketplace-metadata), change svg component entry and making a pull request to the project, after you have committed this changes.

### Steps to build 

If you want to perform a new plugin release, please follow these steps:

1. If you didn't clone already the project from github, go ahead.
1. If you don't have maven already available on your machine, please install it. 
1. Update the project's contents that lead you to perform this new release (if you don't know where to put these contents, please read section File Structure).
1. Go to project's root on your machine.
1. Run mvn package - this will read pom.xml on the project's root and start to create the new release artifacts, based on the information available under the project structure.
1. Upload the generated artifacts to project's new release on github. You can find them here:
    1. assemblies/cde-dashboard/target/sample-svg-component.zip;
    1. assemblies/platform-plugin/target/svg-component-cdf.zip.
1. Copy URLs to the new artifacts you have just uploaded.
1. Save the release.
1. Update marketplace.xml svg component entry with the URL obtained in the previous step.
1. Make a pull request to update the marketplace.xml on the main project.
1. After pull request approval, publish the release.
1. Finally, if you want to clean your target folder after this operation, please run mvn clean.


