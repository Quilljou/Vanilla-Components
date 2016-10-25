(function(){
    window.CityPicker = function()　{
        this.data = null;
    }


    CityPicker.prototype.init = function(element,options) {
        extendDefault.call(this,options);
        getData.call(this);

        return this;
    }

    // private method

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
            console.log(this.data);
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
