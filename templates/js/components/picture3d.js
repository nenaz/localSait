(function (app,$) {
    var App3d = function (el) {
        var me = this;
        me.el = el;
        me.init();
    };

    App3d.prototype.eventStart = 'mousedown';

    App3d.prototype.eventMove = 'mousemove';

    App3d.prototype.eventStop = 'mouseup';
    
    App3d.prototype.masPictureLength = 36;
    
    App3d.prototype.picPath = '../images/pic3D/';
    
    App3d.prototype.picName = 'Broco_';
    
    App3d.prototype.picExtension = '.jpg';
    
    App3d.prototype.init = function () {
        var me = this;
        // document.getElementById('3dmove').addEventListener(me.eventStart, function (e) {
            // me.el = e.target;
            // e.preventDefault();
            // app.startPos = e.clientX;
            // document.addEventListener(me.eventMove, me.onMove);
            // document.addEventListener(me.eventStop, me.onStopped);
        // });
        // debugger;
        (me.el)[0].addEventListener(me.eventStart, function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.startPos = e.clientX;
            (me.el)[0].addEventListener(me.eventMove, me.onMove.bind(me));
            (me.el)[0].addEventListener(me.eventStop, me.onStopped.bind(me));
        });
    };
    
    App3d.prototype.onMove = function (e) {
        var me = this,
            moveX = e.clientX,
            nowPicName = e.target.getAttribute('src'),
            nowPicItem;
            // debugger;
        if (nowPicName) {
            nowPicItem = nowPicName.match(/\d+(?=\.)/g);
            nowPicItem = parseInt(nowPicItem[0]);
            if (moveX > me.startPos){
                nowPicItem = (nowPicItem === 36) ? 1 : nowPicItem + 1;
            } else {
                nowPicItem = (nowPicItem === 1) ? 36 : nowPicItem - 1;
            }
            me.startPos = moveX;
            (me.el)[0].setAttribute('src', me.picPath + me.picName + nowPicItem + me.picExtension);
        }
        // } else {
            // me.onStopped.bind(me);
        // }
    };
    
    App3d.prototype.onStopped = function (e) {
        var me = this;
        // document.removeEventListener(this.eventMove, this.onMove);
        (me.el)[0].removeEventListener(me.eventMove, me.onMove);
        // me.init();
    };
    // debugger;
    
    app.Utils.initComponent('app3d', App3d);
})(App);