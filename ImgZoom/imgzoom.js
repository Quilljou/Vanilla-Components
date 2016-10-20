(function(){
    'use strict'

    window.ImgZoom = function(options){
        this.options = options;
        this.remained = getRemained();
        this.overlay = this.options.overlay || 'rgba(255,255,255,0.8)';
        var self = this;

        window.onclick = function(event){
            self.remained.forEach(function(item){
                if(event.target == item){
                    item.style.cursor = "zoom-out";
                }
            })
        }
    }

    function buildImg(){
        
    }

// pravite method
    function getRemained(){
        var imgs = document.getElementsByTagName('img');
        var imgArr = [].slice.call(imgs,0);
        var remained = [];
        imgArr.forEach(function(item){
            if(item.dataset.zoom && item.dataset.zoom === "true" ){
                item.style.cursor = 'zoom-in';
                remained.push(item);
            }
        })
        return remained;
    }
})()
