const http = require('http')
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

const server = http.createServer((req, res) => {
  if (req.method.toUpperCase() === "GET") {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(nameList));
  }
  if (req.method.toUpperCase() === "POST") {
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>Post.</h1>");
  }
  if (req.method.toUpperCase() === "DELETE") {
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>Delete.</h1>");
  }

});

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})



