EventSystem = {

    /** Event map of style
     * {
     *      "Module" : {
     *          context: moduleInstance,
     *          subscriptions: {
     *              "notify:moduleName.somethingHappened" : onSomethingHappenedFunctionOfModule,
     *              "request:moduleName.doSomething" : doSomethingFunctionOfModule,
     *          }
     *      }
     * }
     */

    EventMap: {},


    /** Function injected into all modules
     *
     */

    fireEvent: function(event) {
        var me = EventSystem,
            subs;

        for (var module in me.EventMap) {
            if (me.EventMap.hasOwnProperty(module)) {
                subs = me.EventMap[module].subscriptions;
                for (var event in subs) {
                    if (subs.hasOwnProperty(event)) {
                        subs[event].apply(me.EventMap[module].context, Array.prototype.slice.call(arguments, 1));
                    }
                }
            }
        }
    },

    registerModule: function(name, instance) {
        var me = EventSystem;
        if (!Utils.isDefined(me.EventMap[name])) {
            me.EventMap[name] = {
                context: instance,
                subscriptions: (instance.registerEvents && instance.registerEvents()) || {}
            };
            instance.fireEvent = me.fireEvent;
        } else {
            console.log(Error("Module " + name + ", already registed"));
        }
    }
};
