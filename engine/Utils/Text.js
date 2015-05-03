Text = {

    getTextImage: function (text, fontSize, fontFamily, offset, maxWidth, operations) {
        var fontConfig, canvas, ctx, x, y;

        fontSize = fontSize || 50;
        fontFamily = fontFamily || "Verdana";
        offset = offset || 0;
        operations = operations || [
            {}
        ];
        operations[0] = operations[0] || {};

        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        fontConfig = Text.shrinkFont(text, fontSize, fontFamily, offset, maxWidth, ctx);

        canvas.width = fontConfig.dimensions.width;
        canvas.height = fontConfig.dimensions.height;

        x = offset;
        y = fontConfig.dimensions.height / 2;

        Text.drawText(text, fontConfig.font, x, y, operations, ctx);

        return canvas;
    },

    drawText : function (text, font, x, y, operations, ctx, maxWidth) {
        var drawType, posX, posY;

        ctx.shadowOffsetX = 0;
        ctx.textBaseline = "middle";
        ctx.font = font;

        for(var i in operations){
            drawType = operations[i].drawType || "fill";

            for(var j in operations[i]){
                if(j !== "drawType") {
                    if(j === "fillStyle" && typeof(operation) === "object" ){
                        if(operations[i].type === "linearGradient"){
                            var pos = operations[i].linearGradient,
                                gradient = ctx.createLinearGradient(pos[0], pos[1], pos[2], pos[3]);
                            for(var k in operations[i].colorStop) {
                                gradient.addColorStop(operations[i].colorStop[k].pos, operations[i].colorStop[k].rgb);
                            }
                            ctx.fillStyle = gradient;
                        }

                    }
                    else {
                        ctx[j] = operations[i];
                    }
                }
            }

            posX = (operations[i].offsetX + x) || x;
            posY = (operations[i].offsetY + y) || y;

            if(maxWidth) {
                ctx[drawType + "Text"](text, posX, posY, maxWidth);
            }
            else {
                ctx[drawType + "Text"](text, posX, posY);
            }

            ctx.shadowBlur = null;
        }
    },

    shrinkFont: function(text, fontSize, fontFamily, offset, maxWidth, ctx) {
        var originalFontSize = fontSize,
            font, dimensions;
        do {
            font = fontSize + "px " + fontFamily;
            dimensions = Text.measureText(text, font, offset, ctx);
            fontSize--;
        }
        while (dimensions.width > maxWidth);
        fontSize++;
        return {font: font, fontSize: fontSize, dimensions: dimensions, sizeOffset: originalFontSize - fontSize};
    },

    measureText : function (text, font, offset, ctx) {
        var height = Text.getHeightOfFont(font) * 1.5;
        offset = offset || 0;
        ctx.font = font;
        return {
            width : Math.ceil(ctx.measureText(text).width) + offset * 2,
            height : height + offset * 2
        };
    },

    getHeightOfFont : function (font) {
        return parseInt(/(\d*)px/.exec(font)[1], 10);
    }

}