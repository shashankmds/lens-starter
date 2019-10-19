"use strict";

var LensConverter = require('lens/converter');

var LensArticle = require("lens/article");
var CustomNodeTypes = require("./nodes");

var IngentaConverter = function(options) {
  LensConverter.call(this, options);
};

IngentaConverter.Prototype = function() {

  this.test = function(xmlDoc) {
    return true;     // returning true as we always want this converter being used.
//    var publisherName = xmlDoc.querySelector("publisher-name").textContent;
//    return publisherName === "Microbiology Society";
  };

  // Override document factory so we can create a customized Lens article,
  // including overridden node types
  this.createDocument = function() {
    var doc = new LensArticle({
      nodeTypes: CustomNodeTypes
    });
    return doc;
  };

  // Resolve figure urls
  // --------
  // 

  this.enhanceFigure = function(state, node, element) {
    var graphic = element.querySelector("graphic");
    var url = graphic.getAttribute("xlink:href");
    node.url = this.resolveURL(state, url);
  };


  // Example url to JPG: http://cdn.elifesciences.org/elife-articles/00768/svg/elife00768f001.jpg
  this.resolveURL = function(state, url) {
    // Use absolute URL
    if (url.match(/http:\/\//)) return url;

    // Look up base url
    var baseURL = this.getBaseURL(state);

    if (baseURL) {
      return [baseURL, url].join('');
    } else {
      // Use special URL resolving for production articles
      return [
        "https://www.microbiologyresearch.org/docserver/fulltext/mgen/5/8/",
        url.replace('tif','gif')
      ].join('');
    }
  };

};

IngentaConverter.Prototype.prototype = LensConverter.prototype;
IngentaConverter.prototype = new IngentaConverter.Prototype();
IngentaConverter.prototype.constructor = IngentaConverter;

module.exports = IngentaConverter;
