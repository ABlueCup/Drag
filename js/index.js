let dragRender = (function () {
    let dragContainer = document.querySelector('.dragContainer'),
        draging = dragContainer.getElementsByClassName('draging')[0]
        ;
    //公共变量
    let c = {}; c.left = dragContainer.offsetLeft; c.top = dragContainer.offsetTop;
    let target = null, p = null, e = null, d = null;
    //鼠标按下
    let readyMove = function startMove(ev) {
        target = ev.target || ev.srcElement,
            currentState = target.getAttribute('data-move');
        if (!currentState) {
            return;
        }
        //指针的位置 pointer, 相对于容器
        p = {}; p.left = ev.pageX - c.left; p.top = ev.pageY - c.top;
        //元素当前位置 ele 相对于容器
        e = {}; e.left = target.offsetLeft; e.top = target.offsetTop;
        //差值 difference
        d = {}; d.left = p.left - e.left; d.top = p.top - e.top;
        // 最大值，最小值
        e.maxLeft = dragContainer.clientWidth - target.offsetWidth;
        e.maxTop = dragContainer.clientHeight - target.offsetHeight;
        target.setAttribute('data-isReady', true);

    }
    // 鼠标移动
    let isMoving = function isMoving(ev) {
        if (!target) {
            return;
        }
        if (target.getAttribute('data-isReady') === 'true') {
            p.left = ev.pageX - c.left; p.top = ev.pageY - c.top;
            e.left = p.left - d.left; e.top = p.top - d.top;
            e.left = e.left < 0 ? 0 : (e.left > e.maxLeft ? e.maxLeft : e.left);
            e.top = e.top < 0 ? 0 : (e.top > e.maxTop ? e.maxTop : e.top);
            target.style.top = e.top + 'px';
            target.style.left = e.left + 'px';
        }
    }
    // 鼠标抬起，移动结束， 回归原始状态
    let endMove = function endMove() {
        target.setAttribute('data-isReady', false);
        target = p = d = e = null;
    }
    return {
        init: function init() {
            draging.onmouseenter = function () {
                this.setAttribute('data-move', true);
            }
            draging.onmouseleave = function () {
                this.setAttribute('data-move', false);
                this.setAttribute('data-isReady', false);
            }
            draging.onmousedown = readyMove.bind(draging);
            draging.onmousemove = isMoving.bind(draging);
            draging.onmouseup = endMove.bind(draging);
        }
    }
})();
dragRender.init();
