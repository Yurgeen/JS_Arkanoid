function Enemies() {
    var me = this,
        graphics = ResourceManager.graphics.bird,
        item;

    item = new AnimationItem({
        image : graphics.image,
        x : 150,
        y : 0,
        depths : 3,
        width : 50,
        height : 50,
        spriteConfig : graphics.spriteConfig,
        fps : 30
    });

    AnimationManager.addItem(item);
};

Enemies.prototype.start = function()
{

}

ModuleLoader.MODULES["Enemies"] = Enemies;