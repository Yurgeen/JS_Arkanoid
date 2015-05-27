EventHandler = {

    /*Subscriptions has structure like following
    * subscriptions = {
    *   "event1" : [
    *       {
    *           callback: someFunction,
    *           scope: someModuleObject //used as context
    *       },
    *       {
    *           callback: someAnotherFunction
    *       }
    *   ],
    *   "event2" : []
    * }
     */

    subscriptions: {},

    subscribe: function(event, callback, scope) {
        var me = EventHandler;
        if (!me.subscriptions[event]){
            me.subscriptions[event] = [];
        }
        me.subscriptions[event].push({
                "callback": callback,
                "scope": scope
            });
    },

    fireEvent: function(event, args){
        var me = EventHandler,
            key, i, args = [];
        if (!me.subscriptions[event]) {return; }

        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        for (key in me.subscriptions[event]){
            me.subscriptions[event][key].callback.apply(me.subscriptions[event][key].scope ?
                me.subscriptions[event][key].scope : this, args)
        }
    }
};