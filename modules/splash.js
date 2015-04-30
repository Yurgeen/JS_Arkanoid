function Splash() {
    var me = this,
        logoImg = ResourceManager.graphics.logo.image,
        width = AnimationManager.width,
        height = AnimationManager.height,
        logoItem, textItem, backgroundItem,
        bgCanvas = document.createElement("canvas"),
        bgCtx = bgCanvas.getContext("2d"),
        textOperations = {
             fillStyle : "rgba( 255, 255, 255, 1 )",
             shadowColor : "rgba( 255, 205, 8, 1 )",
             shadowBlur : 5,
             drawType : "fill"
      };

    logoItem = new AnimationItem({
       image : Text.drawText("Press X to win", 36, "Verdana", 0, width*3/4, textOperations),
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
        image : Text.drawText()
    });

    me.logoItem = logoItem;
    AnimationManager.addItem(me.logoItem);

    me.backgroundItem = backgroundItem;
    AnimationManager.addItem(me.backgroundItem);
    //me.textItem = textItem;
};

Splash.prototype.show = function(){
    var me = this;
    me.logoItem.play();
    me.backgroundItem.play();
    //me.textItem.play();
};

Splash.prototype.resumeGame = function () {

};

ModuleLoader.MODULES["Splash"] = Splash;