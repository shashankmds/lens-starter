var LensNodes = require("lens/article/nodes");
var CoverView = LensNodes["cover"].View;
var $$ = require("lens/substance/application").$$;

var CustomCoverView = function(node, viewFactory) {
  CoverView.call(this, node, viewFactory);
};

CustomCoverView.Prototype = function() {
  this.render = function() {
    CoverView.prototype.render.call(this);

    var refUrl = encodeURIComponent(window.location.href);
    var titleUrl = window.location.href.replace('/sidebyside','')

    // Add feeback info
    var introEl = $$('.intro.container', {
      children: [
        $$('.intro-text', {
          html: '<i class="icon-info"></i><a href="'+titleUrl+'">Back to normal view</a>'
        }),
      ]
    });

    // Prepend
    this.content.insertBefore(introEl, this.content.firstChild);
    
    return this;
  }
};

CustomCoverView.Prototype.prototype = CoverView.prototype;
CustomCoverView.prototype = new CustomCoverView.Prototype();
CustomCoverView.prototype.constructor = CustomCoverView;

module.exports = CustomCoverView;
