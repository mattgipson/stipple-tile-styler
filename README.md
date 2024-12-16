# Stipple Styler (Version 1.0)

**Author:** MSG317  
**Contact:** matt@msg317.com  
**Website:** [https://www.msg317com](https://www.msg317.com)  
**License:** MIT

## Overview

**Stipple Styler** is an Adobe Illustrator ExtendScript that generates a stipple-style pattern tile with a range of customizable options. It streamlines the process of creating natural, organic dot (or pixel) patterns that are perfect for backgrounds, textures, shadows and artistic effects.

Users can easily set the tile size, density, distribution mode (uniform or gradient), dot size mode (uniform or variable), shape type (dots or squares), and color options (black, white, custom hex, or pick from a selected object in the document). The gradient mode creates a bottom-heavy look that emulates a smooth black-to-white gradient, while the uniform mode allows for consistent spacing and randomized sizes for a more even distribution.

This script aims to simplify and speed up the stipple style creation process, reducing repetitive tasks and enabling designers to focus on creative results and ensureing a unique result with every tile creation.

## Key Features

- **Tile Size Control:** Define width and height of the clipping mask area.
- **Density & Distribution:**
  - **Uniform:** Consistent spacing and randomized sizes (if min/max differ).
  - **Gradient:** Heavy at the bottom, sparse at the top for a natural fade effect.
- **Dot Size Options:**
  - **Uniform Size:** One fixed size for all dots.
  - **Variable Size:** Min and Max sizes vary either by vertical gradient (when Gradient is selected) or randomly (when Uniform is selected).
- **Shape Types:** Choose between circular dots or square “pixels.”
- **Color Options:**
  - **Black or White:** Quick and easy defaults.
  - **Custom Hex:** Enter a #RRGGBB color code.
  - **Pick from Document:** Use the fill color of a currently selected object in Illustrator.
- **Automatic Clipping Mask:** The final pattern is masked to the specified tile area, ready to be saved as a pattern swatch or reused in your design.

## Installation

1. Download the `StippleStyler.jsx` file (rename as needed).
2. Place the script into your Adobe Illustrator `Scripts` folder. Typically:
   - **macOS:** `/Applications/Adobe Illustrator [version]/Presets/en_US/Scripts/`
   - **Windows:** `C:\Program Files\Adobe\Adobe Illustrator [version]\Presets\en_US\Scripts\`
3. Restart Adobe Illustrator if it’s running.
4. Access the script via `File > Scripts > StippleStyler` in Illustrator.

## Usage

1. Open a new or existing Illustrator document.
2. Run the script (`File > Scripts > StippleStyler`).
3. Adjust parameters in the dialog:
   - **Tile Size:** Width & Height of the pattern tile.
   - **Dot Settings:** Set density.
   - **Distribution:** Choose "Uniform" or "Gradient."
   - **Stipple Size:** Uniform or variable; adjust accordingly.
   - **Stipple Shape:** Dots or Pixels.
   - **Stipple Color:** Black, White, Custom Hex, or Pick from Document.
4. Click **OK** to generate the pattern.
5. The pattern is placed into a new layer and masked. You can select and drag it into the Swatches panel to save as a pattern.

## License

For now, Stipple Styler (V1) is provided as-is for personal or commercial projects. Consider sharing improvements!

## Support & Feedback

For questions, suggestions, or support:
- Website: [https://www.msg317.com](https://www.msg317.com)

Your feedback helps shape future improvements and features.

---

© 2024 MSG317. All rights reserved.
