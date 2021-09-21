import fs from 'fs'
import { createWorker, createScheduler } from 'tesseract.js';
// @ts-ignore
import persianJs from 'persianjs'

async function extractData(x: Buffer): Promise<string[]> {
    const scheduler = createScheduler();
    const numberWorker = createWorker();
    const nameWorker = createWorker();

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
    await numberWorker.loadLanguage('ara_num_test')
    await nameWorker.loadLanguage('ara');
    await numberWorker.initialize('ara_num_test');
    await nameWorker.initialize('ara');

    scheduler.addWorker(numberWorker);
    scheduler.addWorker(nameWorker);

    const results = await Promise.all(rectangles.map((rectangle) => (
        scheduler.addJob('recognize', x, { rectangle })
    )));

    console.log(results.map(r => r.data.text));
    console.log(persianJs(results[0].data.text).toEnglishNumber().toString());
    
    await scheduler.terminate();
    return results.map(r => r.data.text);
}

const file = fs.readFileSync('id.jpg')
extractData(file);
