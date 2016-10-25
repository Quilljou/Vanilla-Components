(function(){
    'use strict'

    window.BackToTop = function(){
        this.transition = null;
        this.duration = null;
        this.to = null;
    }

    BackToTop.prototype.init = function(element,options){
        this.extend();
        // window.addEventListener('scroll',this.watch,false);
        element.addEventListener('click',this.back,false);
    }
    BackToTop.prototype.back = function(event){
        event.stopPropagation();
        event.preventDefault();
        var diff = this.scrollTop - this.to;
        if(this.transition) {

        }else {

        }
    }

    BackToTop.prototype.scrollTop = function(){

        if(window.scrollY) {
            return window.scrollY;
        }else if(window.scrollYoffset) {
            return window.scrollYoffset;
        }else {
            var ele = this.scrollTarget();
            return ele.scrollTop;
        }
    }


    BackToTop.prototype.scrollTarget(){

    }

    BackToTop.prototype.extend(options) {
        var options = options || {};
        this.transition = options.transition || true;
        this.to = options.to || to;
        this.duration = options.duration || 300;
    }

})()
