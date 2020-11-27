var ViewBlock = (function() {
  // 设置 iframe 并返回
  function setIframe(name) {
    var iframe = document.createElement('iframe');
    iframe.name = iframe.id = 'split-view-iframe-' + name;
    iframe.height = '100%';
    iframe.width = '100%';
    iframe.marginheight = '0px';
    iframe.marginwidth = '0px';
    iframe.scrolling = 'auto';
    iframe.seamless = 'seamless';

    return iframe;
  }

  // 设置 mask 并返回
  function setMask(name) {
    var mask = document.createElement('div');
    mask.className = 'split-view-mask';
    mask.id = 'split-view-mask-' + name;
    mask.innerHTML = '<input class="split-view-search" id="split-view-search-' + name + '" type="text" placeholder="' + chrome.i18n.getMessage('searchPlaceholder') + '">';

    return mask;
  }

  // 绑定事件
  function bindEvent(instance) {
    instance.search.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        var url = formatUrl(instance.search.value.trim());
        instance.load(url);
        instance.hideMask();
      }
    });

    instance.mask.addEventListener('mouseover', function(event) {
      if (instance.url) {
        instance.showMask();
      }
    });

    instance.mask.addEventListener('mouseout', function(event) {
      if (instance.url) {
        instance.hideMask();
      }
    });
  }

  // 获取 search 节点
  function getSearch(name) {
    return document.getElementById('split-view-search-' + name);
  }

  // 格式化 url
  function formatUrl(url) {
    if (url.indexOf('http') === 0) {
      return url;
    }

    return 'http://' + url;
  }

  var ViewBlock = function(data) {
    this.name = data.name;
    this.url = '';

    this.view = document.createElement('div');
    this.view.className = 'split-view';
    this.view.id = 'split-view-' + this.name;
    this.view.dataset.name = this.name;

    var style = Object.assign(
      {
        backgroundColor: '#fff',
      },
      data.style
    );
    for (var k in style) {
      this.view.style[k] = style[k];
    }

    this.iframe = setIframe(this.name);
    this.view.appendChild(this.iframe);

    this.mask = setMask(this.name);
    this.view.appendChild(this.mask);

    document.documentElement.appendChild(this.view);
    this.search = getSearch(this.name);
    bindEvent(this);
  };

  ViewBlock.prototype = {
    destory: function() {
      document.documentElement.removeChild(this.view);
    },
    showMask: function() {
      this.mask.style.backgroundColor = 'rgba(255,255,255,0.8)';
      this.search.style.display = 'block';
    },
    hideMask: function() {
      this.mask.style.backgroundColor = 'transparent';
      this.search.style.display = 'none';
    },
    load: function(url) {
      this.iframe.src = this.url = url;
    },
  };

  return ViewBlock;
})();

var viewport = (function() {
  var styleCatch = {}; // 缓存原始样式

  // 设置新样式，缓存原样式
  function setStyle(style) {
    var htmlStyle = document.documentElement.style;
    var modifyHtmlProperty = Object.assign({}, style.html, {
      width: '100%',
      height: '100%',
    });
    styleCatch.html = {
      style: htmlStyle,
      properties: {},
    };

    var bodyStyle = document.body.style;
    var modifyBodyProperty = Object.assign({}, style.body, {
      position: 'absolute',
    });
    styleCatch.body = {
      style: bodyStyle,
      properties: {},
    };

    for (var p in modifyHtmlProperty) {
      styleCatch.html.properties[p] = htmlStyle[p];
      htmlStyle[p] = modifyHtmlProperty[p];
    }

    for (var p in modifyBodyProperty) {
      styleCatch.body.properties[p] = bodyStyle[p];
      bodyStyle[p] = modifyBodyProperty[p];
    }
  }

  // 还原样式
  function recoveryStyle() {
    for (var i in styleCatch) {
      var style = styleCatch[i].style;
      for (var j in styleCatch[i].properties) {
        style[j] = styleCatch[i].properties[j];
      }
    }
  }

  var Viewport = function() {
    this.children = [];
    this.isCreated = false;
  };

  Viewport.prototype = {
    create: function(data) {
      var that = this;

      if (!this.isCreated) {
        setStyle({
          body: data.main.style,
        });

        data.blocks.forEach(function(item) {
          var viewblock = new ViewBlock(item);
          that.children.push(viewblock);
        });

        this.isCreated = true;
      }
    },
    destory: function() {
      if (this.isCreated) {
        this.children.forEach(function(item) {
          item.destory();
        });
        this.children = [];

        recoveryStyle();

        this.isCreated = false;
      }
    },
  };

  return new Viewport();
})();

var execute = {
  // 执行方法集，返回1表示成功，0表示失败，-1表示未执行
  open: function(data) {
    viewport.create(data);
    return 1;
  },
  close: function() {
    viewport.destory();
    return 1;
  },
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.cmd) {
    sendResponse(execute[request.cmd](request.data));
    return;
  }
  sendResponse(-1);
});
