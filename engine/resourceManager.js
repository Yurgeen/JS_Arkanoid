ResourceManager = {

    GRAPHICS_CONFIG : [
        "resources/graphics.json"
    ],

    AUDIO_CONFIG : [
        "resources/audio.json"
    ],

    init : function() {
        var me = this;

        me.graphics = {};
        me.audio = {};

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
                for (var img in config) {
                    var image = new Image();
                    image.onload = function () {
                        if (config.sprite) {
                            me.graphics[img] = [];
                        } else {
                            me.graphics[img] = [image];
                        }
                    };
                    image.src = config[img].image;
                }
            }
        };

        req.open("GET", configFile, true);
        req.send();
    },

    loadAudio : function(configFile) {

    },

    processSprite : function(image, spriteConfig) {

    }
}