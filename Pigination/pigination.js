(function(){
    'use strict'

    window.Pagination = function(){
        this.html = '';
        this.mount = null;
        this.size = null;
        this.index = null;
        this.length = null;
        this.box = null;
        this.pagiClass = '';
    }

    Pagination.prototype.init = function(mount,data){
        this.mount = mount;
        this.buildStatic();
        this.extend(data);
        this.start();
    }



    Pagination.prototype.extend  = function(data){
        this.size = data.size || 30;
        this.index = data.index || 1;
        this.length = data.length || 10;
        this.pagiClass = data.pagiClass || 'current';
        this.queryString = data.queryString;
    }

    Pagination.prototype.prev = function(){
        this.index--;
        if(this.index < 1){
            this.index = 1;
        }
        this.start();
    }
    Pagination.prototype.next = function(){
        this.index++;
        if(this.index > this.size){
            this.index = this.size;
        }
        this.start();
    }
    // join the first or last when necessary
    Pagination.prototype.first = function(){
        this.html = '<a>1</a>...' + this.html;
    }

    Pagination.prototype.last = function(){
        this.html += '...<a>' + this.size + '</a>';
    }

    Pagination.prototype.add = function(f,t){
        for(var i = f; i < t; i++){
            this.html += '<a>' + i + '</a>';
        }
    }

    //
    Pagination.prototype.start = function(){
        if(this.size <= this.length) {
            this.add(1,this.size+1);
        }else if (this.index < this.length - 2){
            this.add(1,this.length-2+1);
            this.last();
        }else if (this.index > this.size - this.length - 2) {
            this.first();
            this.add(this.size - this.length + 2 + 1,this.size+1)
        }else {
            this.first();
            this.add(this.index - 3 ,this.index + 3 + 1);
            this.last();
        }
        this.finish();
    }

    Pagination.prototype.click = function(event){
        event.preventDefault();
        this.index = parseInt(event.target.innerHTML);
        this.start();
    }

    Pagination.prototype.finish = function(){
        this.box = this.mount.getElementsByTagName('span')[0];
        this.box.innerHTML = this.html;
        var links = this.box.getElementsByTagName('a');
        for(var i = 0; i < links.length; i++) {
            if(parseInt(links[i].innerHTML) == this.index){
                links[i].className = this.pagiClass;
            }
            links[i].addEventListener('click',this.click.bind(this),false);
            if(this.queryString){
                links[i].setAttribute('href',this.queryString + links[i].innerHTML);
            }
        }
        this.html = '';
    }


        Pagination.prototype.buildStatic = function(){
            this.mount.innerHTML = [
                '<a>&#9658;</a>',
                '<span></span>',
                '<a>&#9658;</a>',
            ].join('');
            var nav = this.mount.getElementsByTagName('a');
            nav[0].addEventListener('click',this.prev.bind(this),false);
            nav[1].addEventListener('click',this.next.bind(this),false);
        }


        // 创建静态prev,next 绑定click事件
        // 首次创建container
        // start>判断html类型,增加了html,插入a集合，for循环，为当前页加上className,为每一个a绑定事件click事件>(event.target = index,再次重复start，),为每一个a标签加上href="querystring?i"清空html,


        // TODO: querystring
        // TODO: go to end,first
        // TODO: redesign the constrctor
        // TODO: update the number compute


})()
