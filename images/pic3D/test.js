(function(){
    var App3D = function () {
        var me = this;
        me.init();
    };
    
    App3D.prototype.eventStart = 'mousedown';

    App3D.prototype.eventMove = 'mousemove';

    App3D.prototype.eventStop = 'mouseup';
    
    App3D.prototype.masPictureLength = 36;
    
    App3D.prototype.picName = 'Broco_';
    
    App3D.prototype.picExtension = '.jpg';
    
    App3D.prototype.init = function () {
        var me = this;
        document.getElementById('3dmove').addEventListener(me.eventStart, function (e) {
            me.el = e.target;
            e.preventDefault();
            app.startPos = e.clientX;
            document.addEventListener(me.eventMove, me.onMove);
            document.addEventListener(me.eventStop, me.onStopped);
        });
    };
    
    App3D.prototype.onMove = function (e) {
        var me = app,
            moveX = e.clientX,
            nowPicName = e.target.getAttribute('src'),
            nowPicItem;
        if (nowPicName) {
            nowPicItem = nowPicName.match(/\d+/g)
            nowPicItem = parseInt(nowPicItem[0]);
            if (moveX > me.startPos){
                nowPicItem = (nowPicItem === 36) ? 1 : nowPicItem + 1;
            } else {
                nowPicItem = (nowPicItem === 1) ? 36 : nowPicItem - 1;
            }
            me.startPos = moveX;
            me.el.setAttribute('src', me.picName + nowPicItem + me.picExtension);
        } else {
            me.onStopped();
        }
    };
    
    App3D.prototype.onStopped = function (e) {
        document.removeEventListener('mousemove', app.onMove);
    };
    
    window.app = new App3D;
})();