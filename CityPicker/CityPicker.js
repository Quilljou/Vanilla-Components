(function(){
    window.CityPicker = function()　{
        this.data = null;
        this.defaultProvice = null;
    }


    CityPicker.prototype.init = function(element,options) {
        this.element = element;
        extendDefault.call(this,options);
        getData.call(this);
        if(this.data) {
            this.defaultProvice = options.provice || first(this.data);
            this.defaultCity = options.provice || first(this.data);
            this.defaultCounty = options.county || this.defaultCity[0];


            this.buildDom();


        }
        return this;
    }


    CityPicker.prototype.buildDom = function(){
        this.decorate();


    }

    CityPicker.prototype.buildHeader = function() {
    }

    CityPicker.prototype.decorate = function() {
        this.element.disabled = true;
    }

    CityPicker.prototype.bindEvent = function() {

    }

    // private method
    function first(obj) {
        for (var a in obj) return obj[a];
    }

    function extendDefault(o){
        var options = o || {};
        this.dataUrl = options.dataUrl || './Administrative-divisions-of-China/dist/address3.min.json';
    }

    function getData(){
        var xhr = new XMLHttpRequest();
        var dataUrl = this.dataUrl;
        xhr.open('get',dataUrl,true);
        xhr.send(null);

        xhr.onload = function(){
            this.data = JSON.parse(xhr.responseText);
            console.log(first(this.data));
        }
    }


}())

// var data;
// function getJSON(){
//     var xhr = new XMLHttpRequest();
//     var dataUrl = './Administrative-divisions-of-China/dist/address2.json'
//     xhr.open('get',dataUrl,true);
//     xhr.send(null);
//
//     xhr.onload = function(){
//         data = JSON.parse(xhr.responseText);
//         console.log(data);
//     }
// }
//
// getJSON()
