"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tesseract_js_1 = require("tesseract.js");
async function extractData(x) {
    const scheduler = (0, tesseract_js_1.createScheduler)();
    const numberWorker = (0, tesseract_js_1.createWorker)();
    const nameWorker = (0, tesseract_js_1.createWorker)();
    const rectangles = [
        {
            left: 1000,
            top: 1000,
            width: 1400,
            height: 360,
        },
        {
            left: 1000,
            top: 380,
            width: 1400,
            height: 700,
        },
    ];
    await numberWorker.load();
    await nameWorker.load();
    await numberWorker.loadLanguage('ara_num_test');
    await nameWorker.loadLanguage('ara');
    await numberWorker.initialize('ara_num_test');
    await nameWorker.initialize('ara');
    scheduler.addWorker(numberWorker);
    scheduler.addWorker(nameWorker);
    const results = await Promise.all(rectangles.map((rectangle) => (scheduler.addJob('recognize', x, { rectangle }))));
    console.log(results.map(r => r.data.text));
    // console.log(persianJs(results[0].data.text).toEnglishNumber().toString());
    await scheduler.terminate();
    return results.map(r => r.data.text);
}
const file = fs_1.default.readFileSync('out.jpg');
extractData(file);
