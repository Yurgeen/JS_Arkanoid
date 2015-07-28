/**
 * Created by ninjadragon on 19.07.15.
 */
SpriteManager = {

    _fpsGroups: {},
    _localTime: 0,

    processFrame: function (dt) {
        var me = SpriteManager;
        me._localTime += dt;
        me.processSprites();
    },

    processSprites: function() {
        var me = SpriteManager,
            newValue, dn;
        for (var fps in me._fpsGroups) {

            if (!me._fpsGroups.hasOwnProperty(fps)){
                continue;
            }

            newValue = Math.ceil((me._localTime * fps)/1000);

            if (me._fpsGroups[fps].abstractCounter.prevValue === -1){
                me._fpsGroups[fps].abstractCounter.prevValue = newValue;
            }

            dn = newValue - me._fpsGroups[fps].abstractCounter.prevValue;

            for (var c in me._fpsGroups[fps].clients) {
                var client = me._fpsGroups[fps].clients[c];
                client.item.sprite = client.item.sprite + dn > client.size -1? 0 : client.item.sprite + dn;
            }

            me._fpsGroups[fps].abstractCounter.prevValue = newValue;
        }
    },

    registerItem: function (item, fps, loop) {
        var me = SpriteManager;

        if (!Utils.isDefined(me._fpsGroups[fps])) {
            me._fpsGroups[fps] = {
                abstractCounter: {
                    prevValue: -1
                },
                clients: {}
            };
        }

        me._fpsGroups[fps].clients[item.id] = {
            item: item,
            size: ResourceManager.graphics[item.image].spriteConfig.length - 1,
            loop: loop || true
        };
    }
};