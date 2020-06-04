/**
 * 功能
 *      传递一个容器，和容器中的一个元素，这个元素将成为容器中的可拖拽元素
 * @param {element} container 容器
 * @param {element} ele 容器中的元素
 * @return {ele} 可拖拽的元素
 * 
 * @date       2020-06-04
 * @author     kyle Peng
 */
class Drag {
    constructor(container, ele) {
        // 公共变量
        this.container = container;
        this.ele = ele;
        this.isMovable = false; // 不能移动
        this.isReady = false; // 准备好移动了吗
        this.c = { top: this.container.offsetTop, left: this.container.offsetLeft }; // 存储容器的位置信息
        this.p = this.e = this.d = null;//存储指针、元素、差值的信息
        this.init();
    }
    // 准备状态
    readyToMove() {
        if (!this.isMovable) return;
        this.p = { top: event.pageY - this.c.top, left: event.pageX - this.c.left }; //相对于容器的位置
        this.e = { top: this.ele.offsetTop, left: this.ele.offsetLeft, maxTop: this.container.clientHeight - this.ele.clientHeight, maxleft: this.container.clientWidth - this.ele.clientWidth };
        this.d = { top: this.p.top - this.e.top, left: this.p.left - this.e.left };
        this.isReady = true;
    }

    // 移动状态
    isMoving() {
        if (!this.isMovable) return;
        if (!this.isReady) return;    
        this.p.top = event.pageY - this.c.top;
        this.p.left = event.pageX - this.c.left;
        this.e.top = this.p.top - this.d.top;
        this.e.left = this.p.left - this.d.left;
        this.e.top = this.e.top < 0 ? 0 : (this.e.top > this.e.maxTop ? this.e.maxTop : this.e.top);
        this.e.left = this.e.left < 0 ? 0 : (this.e.left > this.e.maxleft ? this.e.maxleft : this.e.left);
        this.ele.style.top = this.e.top + 'px';
        this.ele.style.left = this.e.left + 'px';
    }
    //抬起状态
    endMove() {
        this.isReady = false;
        this.p = this.e = this.d = null;
    }
    init() {
        this.ele.onmouseenter = () => {
            this.isMovable = true;
        }
        this.ele.onmouseleave = () => {
            this.isMovable = false;
            this.isReady = false;
        }
        this.ele.onmousedown = this.readyToMove.bind(this);
        this.ele.onmousemove = this.isMoving.bind(this);
        this.ele.onmouseup = this.endMove.bind(this);
    }
}