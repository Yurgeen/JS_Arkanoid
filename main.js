(function () {
    var ctx = document.getElementById("scene").getContext("2d");
        showPercent = function (progress) {
            ctx.fillStyle = "green";
            ctx.fillRect(225, 225, 350*progress, 150);
        };

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0, 800, 600);
    ctx.fillStyle = "grey";
    ctx.fillRect(200, 200, 400, 200);

    Modules.Loader.init(Animation.SceneManager.draw, showPercent);
})();
