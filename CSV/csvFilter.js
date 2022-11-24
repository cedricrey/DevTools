
const fs = require('fs');
const readline = require('readline');
const fileName = "/homes/me/myCSVFile.csv" //Put your file here
const outPutFile = fileName.replace(/\.csv$/, "_filtered.csv");

const search = /WHAT_YOURE_LOOKING_FOR/gi;


async function processLineByLine() {
    const fileReaderStream = fs.createReadStream(fileName);
    const fileWriterStream = fs.createWriteStream(outPutFile);

    const rl = readline.createInterface({
        input: fileReaderStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    var lineNum = 0;
    for await (const line of rl) {
        if (line.match(search) || lineNum == 0)
            fileWriterStream.write(line + '\r\n');
        lineNum++;
    }
    fileWriterStream.close();
}

processLineByLine();
