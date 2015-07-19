/**
 * Created by ninjadragon on 19.07.15.
 */
SpriteManager = {

    _fpsGroups: {},
    _localTime: 0,

    processFrame: function (dt) {
        var me = SpriteManager;
        me._localTime += dt;
    },

    getCurrentSpriteForEachGroup: function() {
        var me = SpriteManager;
        for (var fps in me._fpsGroups) {

        }
    },

    updateSpriteValue: function(item) {

    },

    registerItem: function (item, fps, loop) {
        var me = SpriteManager;

        if (!Utils.isDefined(me.fpsGroups[fps])) {
            me.fpsGroups[fps] = [];
        }

        me.fpsGroups[fps].push({
            item: item,
            lastSprite: ResourceManager.graphics[item.image].spriteConfig.length
        });
    }
};