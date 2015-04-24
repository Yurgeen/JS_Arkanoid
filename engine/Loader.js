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

        AnimationManager.init.call(AnimationManager, function() {
            ModuleLoader.checkCoreLoaded("AnimationManager");
        });
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
        console.log("All modules are loaded.");
        ModuleLoader.onLoadCallback();
    }
}