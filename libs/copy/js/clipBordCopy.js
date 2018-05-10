
;(function(name, definition) {
    //1.todo amd cmd等支持
    // 检测上下文环境是否为AMD或CMD
    var hasDefine = typeof define === 'function',
        // 检查上下文环境是否为Node
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        // AMD环境或CMD环境q
        define(definition);
    } else if (hasExports) {
        // 定义为普通Node模块
        module.exports = definition();
    } else {
        // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
        this[name] = definition();
    }
})('clipBordCopy', function() {
    var clipBordCopy = function(text) {
        //2.createDom
        var fakeElem = document.createElement('textarea');        
        fakeElem.style.fontSize = '12pt';

        // Reset box model
        fakeElem.style.border = '0';
        fakeElem.style.padding = '0';
        fakeElem.style.margin = '0';

        // Move element out of screen horizontally
        fakeElem.style.position = 'absolute';
        fakeElem.style['left'] = '-9999px';

        // Move element to the same position vertically
        var yPosition = window.pageYOffset || document.documentElement.scrollTop;

        fakeElem.style.top = yPosition + 'px';
        fakeElem.setAttribute('readonly', '');
        fakeElem.value = text;
        document.body.appendChild(fakeElem);
        //3.select
        fakeElem.focus();
        fakeElem.select();
        if(fakeElem.setSelectionRange){
          fakeElem.setSelectionRange(0, fakeElem.value.length);
        }
        //4.copy
        var succeeded = void 0;
        try {
            succeeded = document.execCommand('copy');
        } catch (err) {
            succeeded = false;
        }
        //5.delDom
        if (fakeElem) {
            document.body.removeChild(fakeElem);
            fakeElem = null;
        }
        return succeeded;
    }
    return clipBordCopy;
});