Modules = {};

ModuleLoader = {

    CORE_LOADS : {
      "ResourceManager" : false,
      "AnimationManager" : false
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
    },

    registerModule : function(moduleName, moduleConstructor) {
        var me = ModuleLoader;
        me.MODULES[moduleName] = moduleConstructor;
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
        }
        ModuleLoader.checkModulesLoaded();
    },

    checkModulesLoaded : function () {
        console.log("All modules are loaded.");
        ModuleLoader.onLoadCallback();
    }
}