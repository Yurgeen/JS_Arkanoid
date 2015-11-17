Modules.Loader = {

    CORE_LOADS : {
        "ResourceManager" : false,
        "AnimationManager" : false,
        "UserInputManager" : false
    },

    MODULES : {

    },

    init : function(onLoadCallback) {
        var me = Modules.Loader;

        me.onLoadCallback = onLoadCallback;
        Modules.ResourceManager.init(function() {
            me.checkCoreLoaded("ResourceManager");
        });
        Animation.SceneManager.init(function() {
            me.checkCoreLoaded("AnimationManager");
        });
        UserInputManager.init(function() {
            me.checkCoreLoaded("UserInputManager");
        });
    },

    registerModule : function(moduleConfig) {
        var list = Modules.Loader.MODULES,
            moduleName = moduleConfig.MODULE_NAME;

        if (!Utils.isDefined(moduleName)) {
            console.error("Cannot load modules");
        }

        if (!Utils.isDefined(list[moduleName])) {
            list[moduleName] = moduleConfig.constructor || function() {};
            list[moduleName].prototype = moduleConfig;
        } else {
            console.error("Module " + moduleName + " already exists");
        }
    },

    checkCoreLoaded : function (name) {
        Modules.Loader.CORE_LOADS[name] = true;
        for (var key in Modules.Loader.CORE_LOADS){
            if (!Modules.Loader.CORE_LOADS[key]){
                return;
            }
        }
        Modules.Loader.loadModules();
    },

    loadModules : function () {
        var me = Modules.Loader;
        for (var key in me.MODULES) {
            Modules[key] = new me.MODULES[key];
            EventSystem.registerModule(key, Modules[key]);
            Modules[key].start();
        }
        me.checkModulesLoaded();
    },

    checkModulesLoaded : function () {
        console.log("All modules are loaded.");
        Modules.Loader.onLoadCallback();
    }
};