Modules.Loader.registerModule({

    MODULE_NAME : "Bullets",

    _bullets : [],

    subscribe : function () {
        var me = this;

        return {
            "request:bullets.createBullet" : me.onCreateBullet
        }
    },

    constructor : function () {

    },

    start : function () {
        CollisionManager.couples.push(["enemy", "bullet"]);
    },

    onCreateBullet : function (x, y, angle) {
        var me = this,
            newBullet = new Bullet(x, y, angle);

        CollisionManager.registerItem(newBullet, newBullet.TYPE);
        Animation.SceneManager.addItem(newBullet);
        Animation.SpriteManager.registerItem(newBullet, 15, true);
        newBullet.play();
    }

});