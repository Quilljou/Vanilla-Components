(function(){
    'use strict'

    window.Number = function() {
        this.addBtn = null;
        this.reduceBtn = null;
        this.field = null;
    }

    Number.prototype.init = function(element,options) {
        this.extendDefault(options);
        this.decorate(element);
        this.bindEvent();
    }

    Number.prototype.extendDefault = function(o){
        var options = o || {};
        this.inputName = options.name || 'number';
        this.value = options.value || 1;
        this.limitation = options.limitation || Number.MAX_SAFE_INTEGER;
    }

    Number.prototype.decorate = function(element){
        var style = computed(element)
        var html = ['<span>-</span>','<input type="text">','<span>+</span>'];
        element.innerHTML = html.join('');
        element.style.display = 'inline-block';

        this.reduceBtn = element.getElementsByTagName('span')[0];
        this.field = element.getElementsByTagName('input')[0];
        this.addBtn = element.getElementsByTagName('span')[1];



        this.field.style.height = '100%'
        this.field.setAttribute('name',this.inputName);
        // this.field.innerHTML = this.value;
        this.changeNumber();

        var commonBtn = 'height:100%;cursor:pointer;vertical-align:top;background:gray;display:inline-block;line-height:'+ style.height;
        this.addBtn.style.cssText = commonBtn;
        this.reduceBtn.style.cssText = commonBtn;
    }




    Number.prototype.bindEvent = function(){
        this.addBtn.onclick = add.bind(this);
        this.reduceBtn.onclick = reduce.bind(this);
        this.field.onkeyup = modify.bind(this);
    }

    function modify(event){
        var value = this.field.value;
        var regex = /[^\d]/;
        this.field.value = this.value =  value.replace(regex,'');
    }


    function getKey(event) {
        if(typeof event.keyCode === 'number') {
            return event.keyCode;
        } else {
            return event.charCode;
        }
    }

    function add() {
        if(this.value > this.limitation) return;
        this.value++;
        console.log(this.value);
        this.changeNumber();
    }

    function reduce() {
        if(this.value <= 1) return;
        this.value--;
        this.changeNumber();
    }

    Number.prototype.changeNumber = function(){
        this.field.value = this.value;
    }
// private method
    function computed(element,pseudo) {
        // not fit for width,height because padding,margin
        // var element = covertToElement(selector),

            var computedStyle = null;

            if(typeof pseudo === 'undefined') {
                pseudo = null;
            }

            if(window.getComputedStyle) {
                computedStyle = window.getComputedStyle(element,pseudo);
            }else if (element.currentStyle) {
                // 兼容IE
                computedStyle = element.currentStyle;
            }
            return computedStyle;
    }

}())
