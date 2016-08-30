/**
 * Created by ninjadragon on 19.07.15.
 */
Animation.SpriteManager = {

    _fpsGroups: {},
    _localTime: 0,

    processFrame: function (dt) {
        this._localTime += dt;
        this.processSprites();
    },

    processSprites: function() {
        var newValue, dn;
        for (var fps in this._fpsGroups) {

            if (!this._fpsGroups.hasOwnProperty(fps)){
                continue;
            }

            newValue = Math.ceil((this._localTime * fps)/1000);

            if (this._fpsGroups[fps].abstractCounter.prevValue === -1){
                this._fpsGroups[fps].abstractCounter.prevValue = newValue;
            }

            dn = newValue - this._fpsGroups[fps].abstractCounter.prevValue;

            for (var c in this._fpsGroups[fps].clients) {
                var client = this._fpsGroups[fps].clients[c];
                client.item.sprite = client.item.sprite + dn > client.size -1? 0 : client.item.sprite + dn;
            }

            this._fpsGroups[fps].abstractCounter.prevValue = newValue;
        }
    },

    registerItem: function (item, fps, loop) {
        if (!Sugar.isDefined(this._fpsGroups[fps])) {
            this._fpsGroups[fps] = {
                abstractCounter: {
                    prevValue: -1
                },
                clients: {}
            };
        }

        this._fpsGroups[fps].clients[item.id] = {
            item: item,
            size: Modules.ResourceManager.graphics[item.image].spriteConfig.length - 1,
            loop: loop || true
        };
    }
};