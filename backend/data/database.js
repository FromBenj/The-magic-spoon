import {getCleanData} from "./data-sheet.js";
import {Spoon} from "./entities/Spoon.js";
import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node';

const adapter = new JSONFile('./backend/data/db.json');
export const database = new Low(adapter, {});

const spoonVolume = 15;
const spoonVolumeUnit = 'ml';

export async function initDB() {
    await database.read();
    if (
        Array.isArray(database.data?.spoons) &&
        Array.isArray(database.data?.spoon) &&
        Array.isArray(database.data?.migrationsDate)
    ) {
        return database;
    }
    database.data ||= {spoons: [], migrationsDate: [], spoon: []};
    database.data.spoons ||= [];
    database.data.spoon ||= [];
    database.data.migrationsDate ||= [];

    return database;
}

async function migrateData() {
    await initDB();
    const spoonsData = await dataToMigrate();
    if (spoonsData) {
        const spoonsTable = database.data.spoons;
        spoonsData.forEach((spoon) => spoonsTable.push(spoon));
    }
    const migrationsTable = database.data.migrationsDate;
    const now = Date.now();
    migrationsTable.push({
        now: now,
        readableNow: new Date(now).toLocaleString(),
    });
    const spoonTable = database.data.spoon;
    spoonTable.push({
        volume: spoonVolume,
        unit: spoonVolumeUnit,
    })
    await database.write();
    console.log(`Migrated ${spoonsData ? spoonsData.length : 0} new spoons at ${new Date(now).toLocaleString()}`);
}

await migrateData();


async function dataToMigrate() {
    const data = await getCleanData();
    const validSpoons = data.filter(spoon => {
        const newSpoon = new Spoon(
            spoon.ingredient,
            spoon.weight, spoon.weightUnit,
            spoon.volume, spoon.volumeUnit);
        return newSpoon.isValid();
    });
    if (validSpoons.length > 0 && Array.isArray(validSpoons)) return validSpoons;

    return null;
}
