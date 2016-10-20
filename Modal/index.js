// API设计



(function() {
    // 构造函数
    this.Modal = function() {
        // 全局变量
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;
        this.transitionEnd = transitionSelect();

        // 默认设置
        var defaults = {
            animation: 'fade-and-drop',
            closeButton: '',
            overlay : '',
            modal: '',
            content: ''
        }

        if(arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults,arguments[0]);
        }else {
            this.options = defaults;
        }

    }


    // 公共方法
    Modal.prototype.open = function() {

        buildOut.call(this);

        initializeEvents.call(this);

        window.getComputedStyle(this.modal).height;

        this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? ' default-open default-anchored' : ' default-open');

        this.overlay.className = this.overlay.className + ' default-open';
    }

    Modal.prototype.close = function () {
        var self = this;

        this.modal.className = this.modal.className.replace(' default-open','');
        this.overlay.className = this.overlay.className.replace(' default-open','');

        // see@https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
        this.modal.addEventListener(this.transitionEnd,function() {
            self.modal.parentNode.removeChild(self.modal);
        })

        this.overlay.addEventListener(this.transitionEnd,function() {
            if(self.overlay.parentNode) self.overlay.parentNode.removeChild(self.overlay);
        });

    }


    //　私有方法
    function extendDefaults(source,properties) {
        // source传default.properties传用户设置
        var property;
        for (property in properties) {
            if(properties.hasOwnProperty(property))　{
                // 用户自己创建的属性，而不是继承而来的
                source[property] = properties[property];
            }
        }
        return source;
        // 返回merge后的选项
    }

    function buildOut() {
        var content,contentHolder,docFrag;

        if (typeof this.options.content === 'string') {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // 创建html片段
        docFrag = document.createDocumentFragment();

        // 创建modal 元素
        this.modal = document.createElement('div');
        this.modal.className = 'default-modal ' + this.options.modal + ' ' +  this.options.animation;

        this.closeButton = document.createElement('button');
        this.closeButton.className = 'default-close ' + this.options.closeButton + (this.options.closeButton ? ' ' : '') + this.options.animation;
        this.closeButton.innerHTML = 'x';
        this.modal.appendChild(this.closeButton);

        this.overlay = document.createElement('div');
        this.overlay.className = 'default-overlay ' + this.options.overlay + (this.options.overlay ? ' ' : '') + this.options.animation;
        docFrag.appendChild(this.overlay);

        contentHolder = document.createElement('div');
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        docFrag.appendChild(this.modal);

        document.body.appendChild(docFrag);
    }

    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }


    // 事件

    function initializeEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click',this.close.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click',this.close.bind(this));
        }


    }

    // end closure
}());
