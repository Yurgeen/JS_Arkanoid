Utils = {
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
    }
}