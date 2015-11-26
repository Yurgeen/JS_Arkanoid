CollisionManager = {
    /** Collection of all collidable items grouped by TYPE */
    types: {},

    /** List of TYPE Pairs that can collide each other */
    couples: [],

    /** Add item for collision
     *
     * @param item AnimationItem
     * @param type String
     */
    registerItem: function(item, type) {
        if (!Utils.isDefined(this.types[type])) {
            this.types[type] = [];
        }
        this.types[type].push(item);
    },

    unregisterItem: function(type, item) {
        delete this.types[type][this.types[type].indexOf(item)];
    },

    processCollisions: function() {
        this.couples.forEach(this.checkCouple);
    },

    checkCouple: function(couple) {
        var me = CollisionManager,
            cop1 = me.types[couple[0]] || [],
            cop2 = me.types[couple[1]] || [];

        cop1.forEach(function(item1) {
            cop2.forEach(function(item2){
               if (me.isCollided(item1, item2)) {
                   item1.onCollided(couple[1]);
                   item2.onCollided(couple[0]);
               }
            });
        });
    },

    isCollided: function(item1, item2) {
        //Simple box collision
        return (((item1.y > item2.y) && (item1.y < item2.y + item2.height ))
                &&
            ((item1.x > item2.x ) && (item1.x < item2.x + item2.height)));
    }

};