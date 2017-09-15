# To new Components

This plugin is a CDE component that allows svg file manipulation, through is own data source. We've used maven to create a structure that allows a clean and easy way to created the elements needed to release it.

The project's file structure and his maven configuration elements were created to be used as a source to another CDE components. 

The operations needed to create a new component using this structure are:

1. Install maven;
1. Clone this project;
1. Copy folder structure to another location;
1. On this new location, change the elements necessary to implement the new component;
1. Configure/Adjust the maven elements necessary to reflect the new structure;
1. Build the new project using maven;
1. Release it with github or any other tool.

## File Structure

This component has a maven like structure. This means that we have a clear separation between _implementation_ resources, and the _assemblies_ generated to _publish_ our content.

To materialize this we have two main directories, **impl** and **assemblies**: on **impl** directory you will place your javascript code, and on **assemblies** you will place your static resources (used to configure the component), and you will collect the .zip files to publish our final plugin content.

These main directories are them divided into two different areas, component and sample, to represent the two main action points where we will create content, the code for component and the sample dashboard used to show the component in use.

### Working directories

To create your new component you will be working on the following directories:

* **impl**:
	* on **impl/component/src/main/javascript/** you should place you javascript code and the _component.xml_ used to tell CDE how to show the component;
	* on **impl/sample-component/src/main/resources/** you can place the resources that will represent the component's samples, with the structure that you get after unzip the file that PUC gives after you performe the correspondent download.
* **assemblies**:
	* on **assemblies/platform-plugin/src/main/resources/** you can place the components configuration files that are more static and highly related to the plugin structure that Pentaho Marketplace is expecting (files like _plugin.xml_, _settings.xml_ or _version.xml_). 

## Maven configuration

Maven works through a set of pom.xml files, placed under all the important directories, that help to recreate a hierarchy of artifacts; and a set of _assembly.xml_ files that will tell how we want our package to be assembled.

A simple configuration on maven to meet your component requirements, using the same file structure that is created, will need changes on the main **pom.xml**, under the project's root directory. Here you will find the next variables to change:

* **component.name**
	* used to:
		* name the component zip filename that will be upload to PUC;
		* name the folder under the zip file;
		* name the directory that will be shown on pentaho-server/pentaho-solutions/system/.
	* used on:
		* /assemblies/platform-plugin/src/main/assembly/assembly.xml
		* /assemblies/platform-plugin/src/main/assembly/assembly.xml
		* /assemblies/platform-plugin/src/main/resources/settings.xml
		* /assemblies/platform-plugin/src/main/resources/settings.xml
		* /assemblies/platform-plugin/src/main/resources/resources/components/require-js-cfg.js
		* /assemblies/platform-plugin/src/main/resources/plugin.xml
		* /assemblies/platform-plugin/src/main/resources/plugin.xml
		* /assemblies/platform-plugin/src/main/resources/plugin.xml
* **component.folder**
	* used to: name the folder that will have the component code.
	* used on:
		* /assemblies/platform-plugin/src/main/assembly/assembly.xml
		* /assemblies/platform-plugin/src/main/resources/resources/components/require-js-cfg.js
* **component.filename**
	* used to:
		* name the component zip filename that will be upload to PUC.
	* used on:
		* /assemblies/platform-plugin/pom.xml
* **sample.filename**
	* used to: designate the sample zip folder name. 
	* used on:
		* /assemblies/cde-dashboard/pom.xml

### Special tag Version

The current plugin version is also controlled within pom.xml files. 

For Pentaho Marketplace be able to control the current installed version (and branch), versus the new versions available, we need to make sure that the version stated on the component's entry in marketplace.xml is the same exposed on component's **version.xml** file.

To control this, **version.xml** file (located in _/assemblies/platform-plugin/src/main/resources/_), is aware of a global maven variable called **version**.

To create a new component version this files should be changed (use allways the same number):

* /pom.xml
* /impl/pom.xml
* /impl/component/pom.xml
* /impl/sample-component/pom.xml
* /assemblies/pom.xml
* /assemblies/platform-plugin/pom.xml
* /assemblies/platform-plugin/pom.xml
* /assemblies/cde-dashboard/pom.xml
* /assemblies/cde-dashboard/pom.xml

