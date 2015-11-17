Modules.ResourceManager = {

    GRAPHICS_CONFIG : [
        "resources/graphics.json"
    ],

    AUDIO_CONFIG : [
        "resources/audio.json"
    ],

    init : function(callback) {
        var me = Modules.ResourceManager;

        me.graphics = {};
        me.audio = {};

        me.callback = callback;

        me.loadedImgConfigsCnt = 0;
        me.imagesToLoad = 0;
        me.GRAPHICS_CONFIG.forEach(me.loadGraphics);
        //me.AUDIO_CONFIG.forEach(me.loadAudio(configFile));
    },

    loadGraphics : function(configFile) {
        var me = Modules.ResourceManager,
            req = new XMLHttpRequest(),
            config;

        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                config = JSON.parse(req.responseText);

                me.loadedImgConfigsCnt++;
                me.imagesToLoad += Utils.countProperties(config);

                for (var img in config) {
                    var image = new Image();
                    image.onload = (function(img, image, sprite) {
                        return function () {
                            me.graphics[img] = {};
                            if (sprite) {
                                me.graphics[img].spriteConfig = me.makeSpiteArray(image, sprite.frameWidth, sprite.frameHeight, sprite.count);
                            };
                            me.graphics[img].image = image;
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
        var r = Math.floor(image.width/frameWidth),
            c = Math.floor(image.height/frameHeight),
            n = 0, result = [];

        result.width = frameWidth;
        result.height = frameHeight;
        result.frameN = cnt;

        for (var i = 0; i < c; i++) {
            for (var j = 0; j < r; j++) {
                result.push({
                    "x" : j*result.width,
                    "y" : i*result.height
                });
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
};