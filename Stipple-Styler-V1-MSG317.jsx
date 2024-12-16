/*
Generate a stipple pattern tile with adjustable density, distribution and dot sizes, and color.
Gradient mode creates a bottom-heavy 'black to white' look.
If Uniform distribution is chosen and min!=max size, sizes are randomized uniformly.
Color Options: Black, White, Custom Hex, or Pick from Document (requires user to select an object before OK).
By MSG317
*/

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    var dlg = new Window("dialog", "Stipple Styler Settings");
    dlg.orientation = "column";
    dlg.alignChildren = "fill";

    // Tile Size (Clipping mask area)
    var panelSize = dlg.add("panel", undefined, "Tile Size");
    panelSize.orientation = "row";
    panelSize.alignChildren = "left";

    var wGroup = panelSize.add("group");
    wGroup.orientation = "row";
    wGroup.alignChildren = "left";
    wGroup.add("statictext", undefined, "Width:");
    var wEdit = wGroup.add("edittext", undefined, "800");
    wEdit.characters = 5;

    var hGroup = panelSize.add("group");
    hGroup.orientation = "row";
    hGroup.alignChildren = "left";
    hGroup.add("statictext", undefined, "Height:");
    var hEdit = hGroup.add("edittext", undefined, "600");
    hEdit.characters = 5;

    // Dot Settings
    var panelDots = dlg.add("panel", undefined, "Dot Settings");
    panelDots.orientation = "column";
    panelDots.alignChildren = "left";

    panelDots.add("statictext", undefined, "Density (1=sparse, 100=dense):");
    var densityLine = panelDots.add("group");
    densityLine.orientation = "row";
    densityLine.alignChildren = "left";

    var densitySlider = densityLine.add("slider", undefined, 50, 1, 100);
    densitySlider.preferredSize.width = 150;
    var densityValueText = densityLine.add("statictext", undefined, "50");
    densityValueText.characters = 3;

    densitySlider.onChanging = function() {
        this.value = Math.round(this.value);
        densityValueText.text = this.value.toString();
    };
    densitySlider.onChange = function() {
        this.value = Math.round(this.value);
        densityValueText.text = this.value.toString();
    };

    // Distribution Mode
    var panelDist = dlg.add("panel", undefined, "Distribution");
    panelDist.orientation = "row";
    panelDist.alignChildren = "left";

    var uniformDistRadio = panelDist.add("radiobutton", undefined, "Uniform");
    var gradientDistRadio = panelDist.add("radiobutton", undefined, "Gradient");
    gradientDistRadio.value = true; // Gradient default

    // Stipple Size
    var panelSizeMode = dlg.add("panel", undefined, "Stipple Size");
    panelSizeMode.orientation = "column";
    panelSizeMode.alignChildren = "left";

    var uniformSizeCheck = panelSizeMode.add("checkbox", undefined, "Uniform?");
    uniformSizeCheck.value = true; // Uniform by default

    var sizeLine = panelSizeMode.add("group");
    sizeLine.orientation = "row";
    sizeLine.alignChildren = "left";

    var minSizeLabel = sizeLine.add("statictext", undefined, "Size (px):");
    var minSizeEdit = sizeLine.add("edittext", undefined, "2");
    minSizeEdit.characters = 5;

    var maxSizeLabel = sizeLine.add("statictext", undefined, "Max (px):");
    var maxSizeEdit = sizeLine.add("edittext", undefined, "5");
    maxSizeEdit.characters = 5;

    function updateSizeFields() {
        if (uniformSizeCheck.value) {
            minSizeLabel.text = "Size (px):";
            maxSizeLabel.visible = false;
            maxSizeEdit.visible = false;
        } else {
            minSizeLabel.text = "Min (px):";
            maxSizeLabel.visible = true;
            maxSizeEdit.visible = true;
        }
    }
    uniformSizeCheck.onClick = updateSizeFields;
    updateSizeFields();

    // Stipple Shape
    var panelShape = dlg.add("panel", undefined, "Stipple Shape");
    panelShape.orientation = "row";
    panelShape.alignChildren = "left";

    var circleRadio = panelShape.add("radiobutton", undefined, "Dots");
    var squareRadio = panelShape.add("radiobutton", undefined, "Pixels");
    circleRadio.value = true; // default

    // Stipple Color
    var panelColor = dlg.add("panel", undefined, "Stipple Color");
    panelColor.orientation = "column";
    panelColor.alignChildren = "left";

    var colorGroup = panelColor.add("group");
    colorGroup.orientation = "row";
    colorGroup.alignChildren = "left";

    var blackColorRadio = colorGroup.add("radiobutton", undefined, "Black");
    var whiteColorRadio = colorGroup.add("radiobutton", undefined, "White");
    var customColorRadio = colorGroup.add("radiobutton", undefined, "Custom");
    var pickDocColorRadio = colorGroup.add("radiobutton", undefined, "Pick from Document");
    blackColorRadio.value = true; // default

    var customColorGroup = panelColor.add("group");
    customColorGroup.orientation = "row";
    customColorGroup.alignChildren = "left";
    customColorGroup.add("statictext", undefined, "Hex (#RRGGBB):");
    var customColorEdit = customColorGroup.add("edittext", undefined, "#000000");
    customColorEdit.characters = 7;
    customColorGroup.enabled = false;

    function updateColorFields() {
        customColorGroup.enabled = customColorRadio.value;
    }

    blackColorRadio.onClick = updateColorFields;
    whiteColorRadio.onClick = updateColorFields;
    customColorRadio.onClick = updateColorFields;
    pickDocColorRadio.onClick = updateColorFields;
    updateColorFields();

    // Buttons
    var btnGroup = dlg.add("group");
    btnGroup.alignChildren = "left";
    var okBtn = btnGroup.add("button", undefined, "OK");
    var cancelBtn = btnGroup.add("button", undefined, "Cancel");

    cancelBtn.onClick = function() {
        dlg.close();
    };

    okBtn.onClick = function() {
        var wVal = parseFloat(wEdit.text);
        var hVal = parseFloat(hEdit.text);
        var minVal = parseFloat(minSizeEdit.text);
        var maxVal = parseFloat(maxSizeEdit.text);

        if (isNaN(wVal) || wVal <= 0 ||
            isNaN(hVal) || hVal <= 0 ||
            isNaN(minVal) || minVal <= 0) {
            alert("Please enter valid numeric values for width, height, and sizes.");
            return;
        }

        if (!uniformSizeCheck.value) {
            if (isNaN(maxVal) || maxVal < minVal) {
                alert("Max Size must be >= Min Size.");
                return;
            }
        }

        if (customColorRadio.value) {
            var hex = customColorEdit.text;
            if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                alert("Invalid hex color. Using black instead.");
                hex = "#000000";
            }
        }

        dlg.close(1);
    };

    if (dlg.show() !== 1) {
        return; // User cancelled
    }

    // Retrieve values
    var stippleWidth = parseFloat(wEdit.text);
    var stippleHeight = parseFloat(hEdit.text);
    var density = densitySlider.value;
    var uniformDist = uniformDistRadio.value; // true if Uniform, false if Gradient
    var uniformSize = uniformSizeCheck.value;
    var minDotSize = parseFloat(minSizeEdit.text);
    var maxDotSize = uniformSize ? minDotSize : parseFloat(maxSizeEdit.text);
    var useCircles = circleRadio.value;

    // Determine color
    var chosenColor;
    if (blackColorRadio.value) {
        chosenColor = doc.swatches["Black"].color;
    } else if (whiteColorRadio.value) {
        var whiteColor = new RGBColor();
        whiteColor.red = 255; whiteColor.green = 255; whiteColor.blue = 255;
        chosenColor = whiteColor;
    } else if (customColorRadio.value) {
        var hex = customColorEdit.text;
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            chosenColor = doc.swatches["Black"].color;
        } else {
            var r = parseInt(hex.substr(1,2),16);
            var g = parseInt(hex.substr(3,2),16);
            var b = parseInt(hex.substr(5,2),16);
            var customRGB = new RGBColor();
            customRGB.red = r; customRGB.green = g; customRGB.blue = b;
            chosenColor = customRGB;
        }
    } else if (pickDocColorRadio.value) {
        // Attempt to pick from currently selected object
        if (doc.selection.length > 0 && doc.selection[0].typename === "PathItem") {
            var selItem = doc.selection[0];
            if (selItem.filled && selItem.fillColor) {
                chosenColor = selItem.fillColor;
            } else {
                alert("Selected object has no fill color. Using black instead.");
                chosenColor = doc.swatches["Black"].color;
            }
        } else {
            alert("No suitable object selected. Using black instead.");
            chosenColor = doc.swatches["Black"].color;
        }
    }

    var area = stippleWidth * stippleHeight;
    var baseUnits = area / (100*100);
    var totalDots = Math.round(density * baseUnits);

    var stippleLayer = doc.layers.add();
    stippleLayer.name = "Stipple Tile";

    var stippleGroup = stippleLayer.groupItems.add();
    stippleGroup.name = "Stipple Group";

    // Adjust exponent for Gradient
    var exponent = 1;
    if (!uniformDist) {
        exponent = 2 + 8 * (density / 100);
    }

    function getRandomY() {
        var availableHeight = stippleHeight - (maxDotSize);
        var baseRand = Math.random();
        var scaledRand = uniformDist ? baseRand : Math.pow(baseRand, exponent);
        var y = scaledRand * availableHeight + (maxDotSize / 2);
        return y;
    }

    for (var i = 0; i < totalDots; i++) {
        var randX = Math.random() * stippleWidth;
        var randY = getRandomY();

        var dotSize;
        if (!uniformSize) {
            if (uniformDist) {
                // Uniform dist: random size between min and max
                dotSize = minDotSize + Math.random()*(maxDotSize - minDotSize);
            } else {
                // Gradient dist: smaller at top, larger at bottom
                var ratio = randY / stippleHeight;
                var invRatio = 1 - ratio; 
                dotSize = minDotSize + (maxDotSize - minDotSize) * invRatio;
            }
        } else {
            // uniform size
            dotSize = minDotSize; 
        }

        var dot;
        if (useCircles) {
            dot = stippleGroup.pathItems.ellipse(
                randY + dotSize/2,
                randX - dotSize/2,
                dotSize,
                dotSize
            );
        } else {
            dot = stippleGroup.pathItems.rectangle(
                randY + dotSize/2,
                randX - dotSize/2,
                dotSize,
                dotSize
            );
        }

        dot.stroked = false;
        dot.filled = true;
        dot.fillColor = chosenColor;
    }

    // Create clipping mask
    var clipRect = stippleLayer.pathItems.rectangle(
        stippleHeight, // top
        0,             // left
        stippleWidth,
        stippleHeight
    );
    clipRect.filled = false;
    clipRect.stroked = false;
    clipRect.zOrder(ZOrderMethod.BRINGTOFRONT);

    doc.selection = null;
    stippleGroup.selected = true;
    clipRect.selected = true;
    app.executeMenuCommand('makeMask');

    alert("Stipple tile created!");
}

main();
