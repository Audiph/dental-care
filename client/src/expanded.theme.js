import '@mui/material/styles/createPalette';

// Extend the PaletteColor and Palette interfaces directly
if (typeof PaletteColor !== 'undefined') {
  PaletteColor.prototype[Symbol.iterator] = function* () {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        yield this[key];
      }
    }
  };
}

if (typeof Palette !== 'undefined') {
  Palette.prototype.tertiary = PaletteColor;
}
