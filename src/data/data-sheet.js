import {parse} from "csv-parse/sync";
import {dataSheetUrl} from "../../dotenv-config.js";

export async function getCleanData() {
    const response = await fetch(dataSheetUrl);
    const csvData = await response.text();
    const csvHeight = getCSVHeight(csvData);

    return parseCSVData(csvData, csvHeight);
}

function parseCSVData(csvData, csvHeight) {
    const parsedData =  parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        to_line: csvHeight,
    });

    return getBackValueType(parsedData);
}

function getCSVHeight(csvData) {
    let height = 0;
    const lines = csvData.trim().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split(',')
        if (line.every((value) => value.trim() === "")) {
            break;
        }
        height++;
    }

    return height;
}

function getBackValueType(data) {
    data.forEach((element) => {
        for (const key in element) {
            if (!isNaN(parseFloat(element[key]))) {
                element[key] = parseFloat(element[key])
            }
            if (element[key] === 'null') {
                element[key] = null;
            }
        }
    })

    return data;
}
