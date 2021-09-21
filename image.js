"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// const wasm = import("wasm-image-to-black-white");
// const file = fs.readFileSync('id_color.jpg')
var img = new Image();
fs_1.default.access('id_color.jpg', fs_1.default.constants.F_OK, (err) => {
    img.src = 'id_color.jpg';
    console.log(`id_color.jpg ${err ? 'does not exist' : 'exists'}`);
});
// wasm.then(bnw => {
//     img.src = bnw.grayscale_with_luminocity(img);
//   });
// jimp.read('id_color.jpg')
//     .then(img => {
//         return img
//             // .greyscale() 
//             // .quality(100)
//             // .rgba(false)
//             // .contrast(0)
//             // .brightness(0)
//             // .dither565()
//             // .invert()
//             // .normalize()
//             // .gaussian(1)
//             // .posterize(2)
//             // .sepia()
//             // .color([
//             //     { apply: 'shade', params: [10] },
//             //   ])
//             .write('out.jpg'); // save
//     })
//     .catch(err => {
//         console.error(err);
//     });
