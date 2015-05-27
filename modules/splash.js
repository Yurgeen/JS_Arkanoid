function Splash() {
    var me = this,
        logoImg = ResourceManager.graphics.logo.image,
        width = AnimationManager.width,
        height = AnimationManager.height,
        logoItem, textItem, backgroundItem,
        bgCanvas = document.createElement("canvas"),
        bgCtx = bgCanvas.getContext("2d"),
        textOperations = {
             fillStyle : "#FF00FF",
             shadowColor : "rgba( 0, 0, 8, 1 )",
             shadowBlur : 5,
             drawType : "fill"
        },
        textImage = Text.getTextImage("Press X to win", 36, "Verdana", 0, width*3/4, textOperations);

    logoItem = new AnimationItem({
       image : ResourceManager.graphics.logo.image,
       x : Math.ceil((width - logoImg.width) / 2),
       y : 50,
       depth : 11
    });

    bgCanvas.width = width;
    bgCanvas.height = height;

    bgCtx.fillStyle = "#000000";
    bgCtx.fillRect(0,0, width, height);

    backgroundItem = new AnimationItem({
        x : 0,
        y : 0,
        depth : 10,
        image : bgCanvas
    });

    textItem = new AnimationItem({
        image : textImage,
        x : Math.ceil((width - textImage.width)/2),
        y : height - textImage.height - 50,
        depth : 11
    });

    me.logoItem = logoItem;
    AnimationManager.addItem(me.logoItem);

    me.backgroundItem = backgroundItem;
    AnimationManager.addItem(me.backgroundItem);

    me.textItem = textItem;
    AnimationManager.addItem(me.textItem);
};

Splash.prototype.EventCallbacks = {
    "request:Splash.show" : this.show,
    "request:Splash.hide" : this.hide
};

Splash.prototype.show = function(){
    var me = this;
    me.logoItem.restore();
    me.backgroundItem.restore();
    me.textItem.restore();
};

Splash.prototype.hide = function () {
    EventHandler.fireEvent("notify:Splash.closed");
};

ModuleLoader.MODULES["Splash"] = Splash;