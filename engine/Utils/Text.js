Utils.Text = {

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

    /*  Canvas draw text styles example
    *    PlainStyle = {
    *        fillStyle : "grba(255, 0, 0, 1)"
    *    }
    *
    *    GradientStyle = {
    *       fillStyle = {
    *           type : "linearGradient",
    *           linearGradient : [0, 0, 0, 60],
    *           colorStop : [
    *               {
    *                   pos : 0,
    *                   color : "#FFFFFF"
    *               },
    *               {
    *                   pos : 1,
    *                   color : "#000000"
    *               }
    *           ]
    *       }
    *    }
    *
    *    GlowStyle = {
    *
    *    }
    }*/

    drawText : function (text, font, x, y, operations, ctx, maxWidth) {
        var drawType, posX, posY;

        ctx.shadowOffsetX = 0;
        ctx.textBaseline = "middle";
        ctx.font = font;

        for(var key in operations) {
            if (!operations.hasOwnProperty(key)) continue;

            drawType = operations[key].drawType || "fill";

            if (key === "fillStyle" && typeof(operations[key]) === "object") {
                if (operations[key].type === "linearGradient") {
                    var pos = operations[key].linearGradient,
                        gradient = ctx.createLinearGradient(pos[0], pos[1], pos[2], pos[3]);
                    for (var k in operations[key].colorStop) {
                        gradient.addColorStop(operations[key].colorStop[k].pos, operations[key].colorStop[k].color);
                    }
                    ctx.fillStyle = gradient;
                }
            } else {
                ctx[key] = operations[key];
            }

            posX = (operations[key].offsetX + x) || x;
            posY = (operations[key].offsetY + y) || y;

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

};