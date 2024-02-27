import fs from "fs";
import path from "path";

const base = "content/standaarden";

function getConfigurationFilesContent(dir: string, filelist: any[] = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        try {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = getConfigurationFilesContent(path.join(dir, file), filelist);
            } else if (path.extname(file) === '.json') {
                const fileContent = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
                filelist.push(fileContent);
            }
        } catch (error) {
            console.error(`Error reading file ${file}: ${error}`);
        }
    });

    return filelist;
}

export default defineEventHandler(async (event) => {
    try {
        const configurationFiles = getConfigurationFilesContent(base);
        return configurationFiles;
    } catch (error: unknown) {
        console.error(`Error fetching configuration files: ${error}`);
        throw createError({
            message: "Unable to fetch configuration files.",
            statusCode: 500,
            fatal: false,
        });
    }
});