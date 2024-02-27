import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    try {
        console.log("kek", event.context.params?.name)
        const base = "content/standaarden";
        const filePath = path.join(base, event.context.params?.name ?? "");
        console.log(filePath)
        console.log(filePath)
        console.log(filePath)

        return sendStream(event, fs.createReadStream(decodeURIComponent(filePath)));
    } catch (error: unknown) {
        console.error(error);
        return send(event, 404, "Not found");
    }
});