Sugar = {
    countProperties : function (obj) {
        var count = 0;
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                ++count;
        }
        return count;
    },

    apply : function(obj, ext) {
        for (var key in ext){
            obj[key] = ext[key]
        }
    },

    isDefined : function(variable) {
        return (typeof variable != 'undefined');
    },

    useGlobal : function (varname) {
        if (!window[varname]) {
            window[varname] = {};
        }
    }
};