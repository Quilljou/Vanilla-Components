// catption design
// caption =  ['caption-1','caption-2','caption-3']
// caption-1:


(function() {
    'use strict'

    window.Slider = function () {
        this.slider = null;
        this.pagination = null;
        this.ul = null;
        this.prev = null;
        this.next = null;

        var defaults = {
            slider:'',
            parent: document.body,
            dirControl : '',
            pagination : '',
            paginationBtn : '',
            img: ['http://www.fillmurray.com/800/500','http://www.fillmurray.com/900/400','http://www.fillmurray.com/1000/400','http://www.fillmurray.com/800/700','http://www.fillmurray.com/800/600'],
            link: ['http://placehold.it/300x300','http://placehold.it/300x300','http://placehold.it/300x300','http://placehold.it/300x300','http://placehold.it/300x300'],
            caption: [],
            autoPlay: true,
            waitTime:'3000',
            num: true,
            direction: 'right',
            pause: false,
            activeClass: '',
            angle: ''
        }

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendsDefaults(arguments[0],defaults);
        }else {
            this.options = defaults;
        }

    }


    Slider.prototype.create = function() {
        buildDom.call(this);
        console.log(this);
        buildLogic.call(this);
    }
    Slider.prototype.goTo = function(to) {
        if(to < 0 || to > this.ul.childElementCount) return;

    }


    function buildDom() {
        var docFrag;


        // create a fragment
        docFrag = document.createDocumentFragment();

        // create the slider wrapper
        this.slider = document.createElement('div');
        this.slider.className = 'default-slider ' + this.options.slider;


        var ul = document.createElement('ul');
        this.ul = ul;

        if (this.options.link !== '' || this.options.link !== null) {
            //with link
            for (var i = 0; i < this.options.link.length; i++) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                li.dataset.index = i;

                a.href=this.options.link[i];
                a.className = 'default-link'

                if(this.options.img && this.options.img !== false) {
                    // with link,img
                    var img = document.createElement('img');
                    img.src=this.options.img[i];
                    img.className = 'default-img';
                    a.appendChild(img);
                }

                li.appendChild(a);

                if(this.options.caption.length !== 0 ) {
                    var caption = document.createElement('div');
                    // with link,caption
                    if(typeof this.options.caption === 'string' ) {
                        caption.innerHTML = this.options.caption[i];
                    }else if (typeof this.options.caption === 'object') {
                        caption.appendChild(this.options.caption[i])
                    }
                    li.appendChild(caption)
                }


                ul.appendChild(li);
            }
        }else {
            // without link
            if(this.options.img && this.options.img !== false) {
                // without link,with img,
                for(var i = 0; i < this.options.img.lengthl;i++) {
                    var li = document.createElement('li');
                    var img = document.createElement('img');

                    img.src=this.options.img[i];
                    img.className = 'default-img';

                    li.appendChild(img)

                    if(this.options.caption.length !== 0 ) {
                        // with link,caption
                        var caption = document.createElement('div');
                        if(typeof this.options.caption === 'string' ) {
                            caption.innerHTML = this.options.caption[i];
                        }else if (typeof this.options.caption === 'object') {
                            caption.appendChild(this.options.caption[i])
                        }
                        li.appendChild(caption)
                    }

                    ul.appendChild(li)
                }
            }else if (this.options.caption.length !== 0 && this.options.img === false) {
                // without link,img,width options
                for(var i = 0; i < this.options.caption.length;i++) {
                    var li = document.createElement('li');
                    var caption = document.createElement('div');
                    if(typeof this.options.caption === 'string' ) {
                        caption.innerHTML = this.options.caption[i];
                    }else if (typeof this.options.caption === 'object') {
                        caption.appendChild(this.options.caption[i])
                    }
                    li.appendChild(caption)
                }
                ul.appendChild(li);
            }
        }
        this.slider.appendChild(ul);

        // if need dirControl.default on
        if (this.options.dirControl !== false) {
            var prev = document.createElement('div');
            var next  = document.createElement('div');

            if(this.options.angle) {
                var leftAngle = document.createElement('span')
                var rightAngle = document.createElement('span')
                leftAngle.innerHTML = '❬'
                rightAngle.innerHTML = '❭'
                leftAngle.className = this.options.angle;
                rightAngle.className = this.options.angle;
                prev.appendChild(leftAngle);
                next.appendChild(rightAngle);
            }
            // prev.innerHTML = '❮'
            // next.innerHTML = '❯'

            prev.className = 'default-dir-control default-prev ' + this.options.dirControl;
            next.className = 'default-dir-control default-next ' + this.options.dirControl;

            this.slider.appendChild(prev);
            this.slider.appendChild(next);
            this.prev = prev;
            this.next = next;
        }

        // if need pagination.default on

        if (this.options.pagination !== false) {
            this.pagination = document.createElement('div')
            this.pagination.className = 'default-pagination ' + this.options.pagination;

            for(var i = 0; i < ul.children.length; i++) {
                var span = document.createElement('span');
                span.className = 'default-page-btn ' + this.options.paginationBtn;
                if(this.options.num === true) {
                    span.innerHTML = i + 1;
                    span.dataset.index = i;
                }
                this.pagination.appendChild(span);
            }
        }
        this.slider.appendChild(this.pagination)

        // insert to dom
        var parent = covertToElement(this.options.parent);
        docFrag.appendChild(this.slider);
        parent.appendChild(docFrag);


        // fix ul height
        // var w = computed(parent).width;
        window.onresize = setHeight;
        function setHeight(){
            var h = computed(parent).height;
            ul.style.height　= h;

        }
        setHeight();
        // var NodeArr = [].slice.call(ul.childNodes,0)
        // covert it to real node array
        // NodeArr.forEach(function(elem){
        //     elem.style.width = w;
        //     elem.style.height = h;
        // })
    }

    function buildLogic() {
        var cur = 0;
        var next,prev;
        var self = this;
        var timer = null;

        function changeSlide(){
            next = cur+1;
            prev = cur-1;

            if(cur >= self.ul.childElementCount - 1) {
                next = 0;
                if(cur >= self.ul.childElementCount){
                    prev = self.ul.childElementCount - 1 ;
                    cur = 0;
                    next = 1;
                }
            }else if(cur <= 0) {
                prev = self.ul.childElementCount - 1 ;
                if(cur <= -1){
                    cur = self.ul.childElementCount -1;
                    prev = cur - 1;
                    next = 0;
                }
            }
        }



        function render(){
            var NodeArr = [].slice.call(self.ul.childNodes,0);
            NodeArr.forEach(function(ele){
                ele.style.display = 'none';
            })

            self.ul.childNodes[cur].style.cssText　= "transform:translate3d(0,0,0);display=block";
            self.ul.childNodes[next].style.cssText　= "display=block;transform:translate3d(100%,0,0)";
            self.ul.childNodes[prev].style.cssText　= "display=block;transform:translate3d(-100%,0,0)";

                NodeArr.forEach(function(ele){
                    ele.style.transition = 'transform 400ms linear';
                })

            for(var p = 0; p < self.pagination.childElementCount; p++){
                self.pagination.childNodes[p].className = 'default-page-btn';
            }
            self.pagination.childNodes[cur].className += ' default-active-class ' + self.options.activeClass;
        }

        function prevSlide(){
            cur--;
            changeSlide();
            render();
        }

        function nextSlide(){
            cur++;
            changeSlide();
            render();
        }

        function manual(event){
            console.log(event.target);
            var index = parseInt(event.target.dataset.index);
            cur = index
            changeSlide();
            render();
            event.stopPropagation();
        }


        function autoPlay(){
            var self = this;
            changeSlide();
            render();
            cur++;
        }


        function play(){
            timer = setInterval(autoPlay,self.options.waitTime);
        }

        play()

        function stop(){
            clearInterval(timer);
        }


        if(self.next){
            self.next.onclick = nextSlide;
            self.next.onmouseleave = play;
            self.next.onmouseenter = stop;
        }

        if(self.prev) {
            self.prev.onclick = prevSlide;
            self.prev.onmouseenter = stop;
            self.prev.onmouseleave = play;
        }

        if(self.pagination) {
            self.pagination.onmouseenter = stop;
            self.pagination.onmouseleave = play;
            self.pagination.onclick = manual;
        }
    }


    // utils
    function computed(selector,pseudo) {
        var element = covertToElement(selector),
            computedStyle = null;

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

    function $(selector,parent) {
        if(typeof selector !== 'string') { return null }
        else { selector = selector.trim() };
        // 如果selector不是字符串,返回

        if(!parent || selector.charAt(0) === '#') {
            parent = document;
        }
        if (typeof parent === 'string') {
            parent = $(parent)
        }
        switch (selector.charAt(0)) {
            case '#':
                return parent.getElementById(selector.substr(1));
                break;
            case '.':
                return parent.getElementsByClassName(selector.substr(1))[0];
                break;
            default:
                return parent.getElementsByTagName(selector)[0];
        }
    }

    function covertToElement(selector) {
        if(typeof selector === 'string') {
            return $(selector);
        }else {
            return selector;
        }
    }


    function extendsDefaults(custom,defaults) {
        for(var key in custom) {
            if(custom.hasOwnProperty(key)) {
                defaults[key] = custom[key];
            }
        }
        return defaults;
    }

    function initialEvents() {
        if(this.options.dirControl) {

        }

        if(this.options.btnControl) {

        }
    }



})()
