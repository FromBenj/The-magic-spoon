import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
export const dataAccessPassword = process.env.DATA_ACCESS_PW;
export const dataSheetUrl = process.env.DATA_SHEET_URL;
