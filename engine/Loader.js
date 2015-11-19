Modules = {};

Modules.Loader = {

    CORE_LOADS : {
        "ResourceManager" : false,
        "AnimationManager" : false,
        "UserInputManager" : false
    },

    MODULES : {

    },

    init : function(onLoadCallback, showPercent) {

        this.showProgress = showPercent;
        this.toLoadCont_ = Object.keys(this.CORE_LOADS).length + Object.keys(this.MODULES).length;
        this.loadedCount_ = 0;

        this.onLoadCallback = onLoadCallback;
        Modules.ResourceManager.init (this.checkCoreLoaded.bind (this, "ResourceManager"));
        Animation.SceneManager.init (this.checkCoreLoaded.bind (this, "AnimationManager"));
        UserInputManager.init (this.checkCoreLoaded.bind (this, "UserInputManager"));
    },

    registerModule : function(moduleConfig) {
        var list = this.MODULES,
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
        this.CORE_LOADS[name] = true;
        this.loadedCount_++;
        this.showProgress(this.loadedCount_/this.toLoadCont_);

        for (var key in this.CORE_LOADS){
            if (!this.CORE_LOADS[key]){
                return;
            }
        }
        this.loadModules();
    },

    loadModules : function () {
        for (var key in this.MODULES) {
            Modules[key] = new this.MODULES[key];
            EventSystem.registerModule(key, Modules[key]);
            Modules[key].start();
            this.loadedCount_++;
            this.showProgress(this.loadedCount_/this.toLoadCont_);
        }
        this.checkModulesLoaded();
    },

    checkModulesLoaded : function () {
        console.log("All modules are loaded.");
        this.onLoadCallback();
    }
};