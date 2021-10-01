const fs = require('fs')

const fileInit = (fileName, initVal) => {
  let retVal;
  if (fs.existsSync(fileName)) {
    retVal = JSON.parse(fs.readFileSync(fileName, "utf8"));
  } else {
    fs.writeFileSync(fileName, JSON.stringify(initVal));
    retVal = initVal;
  }
  return retVal;
}

const getID = () => {
  let ID = JSON.parse(fs.readFileSync("IDs.txt", "utf8"));
  ID++;
  fs.writeFileSync("IDs.txt", JSON.stringify(ID));
  return ID;
}

let nameList = fileInit("names.txt", []);
let ID = fileInit("IDs.txt", 0);

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try{
      let body = "";

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });

    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  fileInit,
  getID,
  nameList,
  getPostData
}
