Text = {

    drawText: function (text, fontSize, fontFamily, offset, maxWidth, operations) {
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

        Text.performOperations(text, fontConfig.font, x, y, operations, ctx);

        return canvas;
    },

    /**
     * Draws a text with a given set of operations
     *
     * @param {String} text The text to draw
     * @param {String} font The font to use
     * @param {Number} x The x position to draw on
     * @param {Number} y The y position to draw on
     * @param {Object[]} operations The operations to perform
     * @param {CanvasRenderingContext2D} ctx The context to draw on
     * @param {Number} [maxWidth] The max width of the text
     *
     *
     *     var text = "hello";
     *     var font = "100px Verdana";
     *     var x = 100;
     *     var y = 150;
     *     var operations = [
     *         {
     *             shadowColor : "rgba( 248, 116, 0, 0.8 )",
     *             shadowBlur : 20,
     *             drawType : "fill"
     *         },
     *         {
     *             shadowColor : "rgba( 248, 116, 0, 0.8 )",
     *             shadowBlur : 20,
     *             drawType : "fill"
     *         },
     *         {
     *             shadowColor : "rgba( 248, 116, 0, 0.8 )",
     *             shadowBlur : 20,
     *             drawType : "fill"
     *         },
     *         {
     *             fillStyle : "rgba( 255, 255, 255, 1 )",
     *             shadowColor : "rgba( 255, 205, 8, 1 )",
     *             shadowBlur : 5,
     *             drawType : "fill"
     *         },
     *         {
     *             strokeStyle : "rgba( 255, 205, 8, 1 )",
     *             lineWidth : 1,
     *             shadowBlur : 0,
     *             drawType : "stroke"
     *         }
     *     ];
     *
     *     Animation.utils.text.performOperations(text, font, x, y, operation, ctx);
     */

    performOperations : function (text, font, x, y, operations, ctx, maxWidth) {
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

        // set the fontSize back to the last valid one.
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