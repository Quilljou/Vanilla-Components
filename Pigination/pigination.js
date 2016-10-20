var Pagination = {
    html: '',
    extend: function(data){
        this.size = data.size || 30;
        this.index = data.index || 1;
        this.step = data.step || 1;
    },

    prev: function(){
        this.index--;
        if(this.index < 1){
            this.index = 1;
        }
        this.start();
    },
    next: function(){
        this.index++;
        if(this.index > this.size){
            this.index = this.size;
        }
        this.start();
    },
    // join the first or last when necessary
    first: function(){
        this.html = '<a>1</a>...' + this.html;
    },
    last: function(){
        this.html += '...<a>' + this.size + '</a>';
    },

    add: function(f,t){
        for(var i = f; i < t; i++){
            this.html += '<a>' + i + '</a>';
        }
    },

    //
    start: function(){
        if(this.size < 10) {
            this.add(1,this.size+1);
        }else if (this.index < 6){
            this.add(1,6+1);
            this.last();
        }else if (this.index > this.size - 6) {
            this.first();
            this.add(this.size - 6,this.size+1)
        }else {
            this.first();
            this.add(this.index - 2,this.index + 2);
            this.last();
        }
        this.finish();
    },

    click: function(event){
        event.preventDefault();
        this.index = parseInt(event.target.innerHTML);
        this.start();
    },

    finish: function(){
        this.box = this.mount.getElementsByTagName('span')[0];
        this.box.innerHTML = this.html;
        var links = this.box.getElementsByTagName('a');
        for(var i = 0; i < links.length; i++) {
            if(parseInt(links[i].innerHTML) == this.index){
                links[i].className = 'current';
            }
            links[i].addEventListener('click',this.click.bind(this),false);
            links[i].setAttribute('href','/page/:' + links[i].innerHTML);
        }
        this.html = '';
    },



    buildStatic: function(){
        this.mount.innerHTML = [
            '<a>&#9658;</a>',
            '<span></span>',
            '<a>&#9658;</a>',
        ].join('');
        var nav = this.mount.getElementsByTagName('a');
        nav[0].addEventListener('click',this.prev.bind(this),false);
        nav[1].addEventListener('click',this.next.bind(this),false);
    },


    init: function(mount,data){
        this.mount = mount;
        this.extend(data);
        this.buildStatic();
        this.start();
    }

}

// 创建静态prev,next 绑定click事件
// 首次创建container
// start>判断html类型,增加了html,插入a集合，for循环，为当前页加上className,为每一个a绑定事件click事件>(event.target = index,再次重复start，),为每一个a标签加上href="querystring?i"清空html,
