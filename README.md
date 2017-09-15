# SVG Component

SVG Component is a CTools component that can be used to change SVG style atributes or text strings, according to values submitted by it's own datasource.

## Information

* Developer - Webdetails
* Version - 1.0
* Released - n/a
* Dependencies - CDE, CDF and CDA
* Licence - MPL 2.0
* Stage - Unstable and unsupported branch, not recommended for production use.

## Strategy

The strategy implemented followed these steps:
                
1. publish the whole SVG content into a DOM element, using the HTML object tag;
1. after SVG content has been loaded into the DOM, for each record available on the datasource result set:
    1. finds the SVG element that has to be changed, through is own "id" attribute;
    1. inserts/changes the attribute/text directly on the available SVG element

To implement this strategy two rules have to be observed:

* all SVG content must be loaded into the DOM before we start to apply the intended changes;
* SVG files must be located in the same domain.

## Component Parameters

This component expects information from the following parameters:

* URL - the URL to the SVG;
* Datasource - this will specify the datasource that will command the operations;
* Keep Image - adds the possibility to keep SVG on DOM after a component reload/refresh;
* callBackDraw - not mandatory; it allows you to define a function that will be called after all component operations are performed.

## Datasource output format

To perform correctly, the datasource resultset needs to have the following columns (no specific order):

* svgElementID - the SVG element id where we want to perform changes;
* changeType - the type of change we want to perform: _style_ for styling changes, _text_ for text updates;
* styleProperty - the style property to change (it will be ignored for _text_ type changes);
* value - the value that will be added/appended on the SVG element.
