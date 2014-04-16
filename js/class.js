var Class = function(methods) {  
    var Thing = function() { this.init.apply(this, arguments); };
    var property;
    for (property in methods) { Thing.prototype[property] = methods[property]; }
    if (!Thing.prototype.init) Thing.prototype.initialize = function(){};     
    return Thing;   
};