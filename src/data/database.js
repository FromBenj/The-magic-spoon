import {getCleanData} from "./data-sheet.js";
import {Spoon} from "./entities/Spoon.js";
import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node';

const database = new Low(new JSONFile('./src/data/db.json'), {});
const spoonVolume = 15;
const spoonVolumeUnit = 'ml';

async function initDB() {
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
    const data = await dataToMigrate();
    if (data) {
        const spoonsTable = database.data.spoons;
        data.forEach((spoon) => spoonsTable.push(spoon));
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
    console.log(`Migrated ${data ? data.length : 0} new spoons at ${new Date(now).toLocaleString()}`);
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
    const uniqueSpoons = [];
    for (const spoon of validSpoons) {
        const isUnique = await isUniqueSpoon(spoon.ingredient);
        if (isUnique) uniqueSpoons.push(spoon);
    }
    if (uniqueSpoons.length !== 0 && Array.isArray(uniqueSpoons)) {

        return uniqueSpoons;
    }

    return null;
}

async function isUniqueSpoon(ingredient) {
    await initDB();
    const spoon = database.data.spoons.find((spoon) => spoon.ingredient === ingredient);

    return !spoon;
}
