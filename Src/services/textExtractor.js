import fs from 'fs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");
const pdf = pdfModule.default || pdfModule;

import mammoth from 'mammoth';

const extractText = async (filePath, fileType) =>{
    if(fileType ==="application/pdf"){

        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        return data.text;

    }

    if(
        fileType ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ){
        const result = await mammoth.extractRawText({path: filePath});
        return result.value;
    }
    if(fileType ==="text/plain"){
        return fs.readFileSync(filePath, "utf8");
    }
    return "";
};
export default extractText;