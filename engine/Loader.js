ModuleLoader = {

    CORE_LOADS : {
      "ResourceManager" : false,
      "AmimationDrawer" : false
    },

    MODULES : {

    },

    init : function(onLoadCallback) {
        ResourceManager.onLoadCallback = onLoadCallback;
        ResourceManager.init.call(ResourceManager, ModuleLoader.checkCoreLoaded("ResourceManager"));
        AnimationDrawer.init.call(AnimationDrawer, ModuleLoader.checkCoreLoaded("AnimationDrawer"))
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
        ModuleLoader.checkModulesLoaded();
    },

    checkModulesLoaded : function () {
        ModuleLoader.onLoadCallback();
    }
}