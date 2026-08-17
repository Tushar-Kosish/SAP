const fs = require('fs');
const path = require('path');

// Simple 1x1 transparent PNG buffer expanded or SVG wrapper
const png192Base64 = "iVBORw0KGgoAAAANSU50EUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVHhe7cEBDQAAAMKg90t5hmsBAAAAAB8GzQABhZ6yOQAAAABJRU5ErkJggg==";
const png512Base64 = "iVBORw0KGgoAAAANSU50EUgAAAgAAAAICAYAAADrxe5EAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVHhe7cEBDQAAAMKg90t5hmsBAAAAAB8GzQABhZ6yOQAAAABJRU5ErkJggg==";

const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), Buffer.from(png192Base64, 'base64'));
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), Buffer.from(png512Base64, 'base64'));
console.log('PWA icons created successfully.');
