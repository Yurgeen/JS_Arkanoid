ResourceManager = {

    GRAPHICS_CONFIG : [
        "resources/graphics.json"
    ],

    AUDIO_CONFIG : [
        "resources/audio.json"
    ],

    init : function(callback) {
        var me = ResourceManager;

        me.graphics = {};
        me.audio = {};

        me.callback = callback;

        me.loadedImgConfigsCnt = 0;
        me.imagesToLoad = 0;
        me.GRAPHICS_CONFIG.forEach(me.loadGraphics);
        //me.AUDIO_CONFIG.forEach(me.loadAudio(configFile));
    },

    loadGraphics : function(configFile) {
        var me = ResourceManager,
            req = new XMLHttpRequest(),
            config;

        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                config = JSON.parse(req.responseText);

                me.loadedImgConfigsCnt++;
                me.imagesToLoad += Utils.countProperties(config);

                for (var img in config) {
                    var image = new Image();
                    image.onload = (function(img, imager, sprite) {
                        return function () {
                            if (sprite) {
                                me.graphics[img] = me.makeSpiteArray(image, sprite.frameWidth, sprite.frameHeight, sprite.count);
                            } else {
                                me.graphics[img] = [image];
                            }
                            me.checkLoad();
                    }})(img, image, config[img].sprite);
                    image.src = config[img].image;
                }
            }
        };

        req.open("GET", configFile, true);
        req.send();
    },

    loadAudio : function(configFile) {

    },


    makeSpiteArray : function (image, frameWidth, frameHeight, cnt)
    {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d"),
            r = Math.floor(image.width/frameWidth),
            c = Math.floor(image.height/frameHeight),
            n = 0, result = [];

        canvas.width = 	image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        for (var i = 0; i < r; i++) {
            for (var j = 0; j < c; j++) {
                var partCanvas = document.createElement('canvas'),
                    partCtx = partCanvas.getContext("2d"),
                    ImgData = ctx.getImageData(j*frameWidth, i*frameHeight, frameWidth, frameHeight);

                partCanvas.width = 	frameWidth;
                partCanvas.height = frameHeight;
                partCtx.putImageData(ImgData, 0, 0);
                result.push(partCanvas);
                n++;
                if (n > cnt) break;
            }
        }
        return result;
    },

    checkLoad : function() {
        var me = this;
        if (me.GRAPHICS_CONFIG.length == me.loadedImgConfigsCnt && Utils.countProperties(me.graphics) == me.imagesToLoad){
            console.log("All graphics is loaded.");
            me.callback();
        }
    }
}