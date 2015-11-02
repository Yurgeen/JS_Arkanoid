Modules = {};

ModuleLoader = {

    CORE_LOADS : {
        "ResourceManager" : false,
        "AnimationManager" : false,
        "UserInputManager" : false
    },

    MODULES : {
    },

    init : function(onLoadCallback) {
        ModuleLoader.onLoadCallback = onLoadCallback;
        ResourceManager.init(function() {
            ModuleLoader.checkCoreLoaded("ResourceManager");
        });
        AnimationManager.init(function() {
            ModuleLoader.checkCoreLoaded("AnimationManager");
        });
        UserInputManager.init(function() {
            ModuleLoader.checkCoreLoaded("UserInputManager");
        });
    },

    registerModule : function(moduleName, moduleConfig) {
        var list = ModuleLoader.MODULES;

        if (!Utils.isDefined(list[moduleName])) {
            list[moduleName] = moduleConfig.constructor || function() {};
            list[moduleName].prototype = moduleConfig;
        } else {
            console.error("Module " + moduleName + " already exists");
        }
    },

    checkCoreLoaded : function (name) {
        ModuleLoader.CORE_LOADS[name] = true;
        for (var key in ModuleLoader.CORE_LOADS){
            if (!ModuleLoader.CORE_LOADS[key]){
                return;
            }
        }
        ModuleLoader.loadModules();
    },

    loadModules : function () {
        var me = ModuleLoader;
        for (var key in me.MODULES) {
            Modules[key] = new me.MODULES[key];
            EventSystem.registerModule(key, Modules[key]);
            Modules[key].start();
        }
        ModuleLoader.checkModulesLoaded();
    },

    checkModulesLoaded : function () {
        console.log("All modules are loaded.");
        ModuleLoader.onLoadCallback();
    }
};