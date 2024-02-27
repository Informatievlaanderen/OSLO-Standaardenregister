import fs from "fs";
import path from "path";

const base = "content/standaarden";

export default defineEventHandler(async (event) => {
    try {
        const filePath = path.resolve(base, decodeURIComponent(event.context.params?.name ?? ""));
        return sendStream(event, fs.createReadStream(filePath));
    } catch (error) {
        return send(event, 404, "Not found");
    }
});