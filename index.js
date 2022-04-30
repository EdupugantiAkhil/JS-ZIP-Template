const fs = require("fs");
const archiver = require("archiver");

function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

function zipFiles(sourceFileList, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);
  archive.pipe(stream);
  return new Promise((resolve, reject) => {
    for (let i of sourceFileList) {
      let a = i.split("/");
      let filename = a[a.length - 1];
      console.log(filename);
      archive.file(i, { name: filename }).on("error", (err) => reject(err));
    }

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

//zipDirectory("./test", "test2.zip");

zipFiles(
  [
    "/home/akhil/projects/JS-ZIP-Template/test/WaterBrush-Regular.ttf",
    "/home/akhil/projects/JS-ZIP-Template/Untitled.png",
  ],
  "awa.zip"
);
