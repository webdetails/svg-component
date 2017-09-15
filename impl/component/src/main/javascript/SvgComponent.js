define(['cdf/lib/jquery','cdf/components/UnmanagedComponent', 'amd!cdf/lib/underscore', 'cdf/Logger'],function($,UnmanagedComponent,_, Logger){
    
    var SvgComponent = UnmanagedComponent.extend({
		update : function() {
		    var render = _.bind(this.render,this);
			var cd = this.chartDefinition;
            this.triggerQuery(cd,render);
		},
		
		render: function(data){
		    
		    
		    /*
		    
		    Special Parameters:
		        
		        * url - the SVG url that must be on the same domain
		        * keepImage - the boolean flag that determines if the image will be reloaded (False) or not (True) on component ReRender;
		        * drawCallBack - user defined function called after all the component job is done.
		    
		    Strategy:

                The strategy implemented has 3 steps:
                
                1. publish the whole SVG content into a DOM element, using the <object> data attribute;
                2. after SVG content has been loaded into the DOM, tries to find the SVG elements that we want to change;
                3. and, performs the actual change over the SVG element, adding/changing the respective property.
                
                To implement this strategy two rules have to be observed:
                
                * all SVG content must be loaded into the DOM before we start to apply the intended changes;
                * SVG files must be located in the same domain
                	- you can to keep files on ../pentaho/server/pentaho-server/tomcat/webapps/pentaho-style/[images], and access them, via url component property, like /pentaho-style/<image_name>.svg
                	- or directly on PUC folders.
                
            */


		    var objectID = 'id_' + this.htmlObject + '_' + this.name;
            var domObject = document.getElementById(objectID);
            var that = this;
            
            if(!domObject || !this.keepImage){
            
                //empty container in case of reload
                if (domObject) {
                    this.placeholder().empty();
                }
                
                // We need to initialize the image on the container.
                // Modifications will also need to be triggered by the load event
                var template = '<object id="' + objectID + '" data="' + this.url + '"  type="image/svg+xml" class="svg_' + this.name + '" >Your browser doesn\'t support SVG</object>';
                $('#'+this.htmlObject).html(template);
                domObject = document.getElementById(objectID);
                domObject.addEventListener("load", function(event) {
                    var svgDoc = this.getSVGDocument();
                    that.changeSVG(svgDoc, data);
                    
                    //calling user defined function drawCallBack()
                    if((typeof that.drawCallback === "function")) {
                        that.drawCallback();
                    }
                    
                });
                
            }
            else{
                // We already have an image in place that we want to simply modify
	            var svgDoc = domObject.contentDocument; 
                this.changeSVG(svgDoc,data);
            }
            
    	
	    },
    	    
	    changeSVG: function(svgDoc, data){
	        
	        /* the intended changes are made here, according to the changeType and working directly on the available DOM data */
	        
	        if (!_.isEmpty(data) && data.resultset.length > 0) {
                
                var resultSet = data.resultset;
                var metadata = data.metadata;
                var changeType = '';
                var styleProperty = '';
                
                for (var i = 0; i < resultSet.length; i++) {
                       
                    if (_.isObject(svgDoc)) {
                        
                        changeType = resultSet[i][(_.first(_.where(metadata, {"colName": "changeType"}))).colIndex];
                        
                        if (changeType == "style") {
                            
                            //CHANGING ITEM STYLE ATTRIBUTES
                            
                            var item = svgDoc.getElementById(resultSet[i][(_.first(_.where(metadata, {"colName": "svgElementID"}))).colIndex]);
                            
                            if (item) {
                                styleProperty = resultSet[i][(_.first(_.where(metadata, {"colName": "styleProperty"}))).colIndex]; 
                                item.style[styleProperty] = resultSet[i][(_.first(_.where(metadata, {"colName": "value"}))).colIndex];
                            } else {
                               Logger.log("### ID " + resultSet[i][(_.first(_.where(metadata, {"colName": "svgElementID"}))).colIndex] + " WAS NOT FOUND ON SVG STRUTURE ###");
                            }
                            
                        } else if (changeType == "text") {
                            
                            //CHANGING TEXT CONTENT based on svgElementID
                            
                            text = svgDoc.getElementById(resultSet[i][(_.first(_.where(metadata, {"colName": "svgElementID"}))).colIndex]);
                            text.textContent = resultSet[i][(_.first(_.where(metadata, {"colName": "value"}))).colIndex];
                            
                        } else {
                            Logger.log("### changeType IS INCORRECT ###");
                        }
                   } else {
                       Logger.log("### UNABLE TO GET SVG DOCUMENT ###");
                   }
                }
            } else {
                 Logger.log("### COMPONENT QUERY IS EMPTY ###");
            }
	    }
    });
    
    return SvgComponent;
});
