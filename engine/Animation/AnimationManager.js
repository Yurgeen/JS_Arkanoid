AnimationManager = {
    layers : [],

    getNewItemID : function(){
      var ID = 0;
      return (function() {
          return ID++;
      })();
    },

    addItem : function(item) {
        var me = this,
            depth = item.getDepths();
        if (!layers[depth]) {
            layers[depth] = []
        };
        layers[depth].push(item);
    },

    removeItem : function(item) {

    }
};