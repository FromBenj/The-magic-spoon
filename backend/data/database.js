import {getCleanData} from "./data-sheet.js";
import {Spoon} from "./entities/Spoon.js";
import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node';
import * as fs from "node:fs";

const dbPath = './backend/data/db.json';
const adapter = new JSONFile(dbPath);
export const database = new Low(adapter, {});

const backupPath = './backend/data/dbBackup.json';
const backupAdapter = new JSONFile(backupPath);
const backupDatabase = new Low(backupAdapter, {});

const spoonVolume = 15;
const spoonVolumeUnit = 'ml';

export async function initDB(migration = false) {
    await database.read();
    if (migration) {
        database.data = {spoons: [], migrationsDate: [], spoon: []};
    } else if (
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
    const spoonsData = await dataToMigrate();
    if (!spoonsData) return;
    backupDB();

    const database = await initDB(true);
    database.data = {spoons: [], migrationsDate: [], spoon: []};
    const spoonsTable = database.data.spoons;
    spoonsData.forEach((spoon) => {
        spoonsTable.push(spoon)
    });
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

// Launch migrations
await migrateData();

function backupDB() {
    if (!fs.existsSync(dbPath)) {
        console.log('First migration, no need background db');
        return;
    }

    try {
        if (fs.existsSync(backupPath)) {
            fs.unlinkSync(backupPath);
            console.log('Backup file removed');
        }
    } catch (error) {
        console.error(`Failed to remove backup: ${error.message}`);
    }

    try {
        fs.copyFileSync(dbPath, backupPath);
        console.log('Previous db copied as backup db');
    } catch (error) {
        console.error(`Failed to copy db as backup db: ${error.message}`);
    }
}

async function dataToMigrate() {
    const data = await getCleanData();
    const validSpoons = data.map(spoon => {
        return new Spoon(
            spoon.ingredient,
            spoon.weight, spoon.weightUnit,
            spoon.volume, spoon.volumeUnit);
    })
        .filter(spoon => spoon.isValid());
    if (validSpoons.length === 0) return null;

    return validSpoons.map((validSpoon) => {
        return validSpoon.setHash();
    })
}

export async function getSpoonsFromIngredients(userQuery) {
    const database = await initDB();
    const spoonTable = database.data.spoons;
    const q = userQuery.toLowerCase().trim();
    if (typeof q !== 'string') return '';
    return spoonTable.filter(spoon => {
        return spoon.ingredient
            .toLowerCase()
            .trim()
            .startsWith(q)
    });
}
