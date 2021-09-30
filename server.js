const http = require('http')
const fs = require('fs')

const fileInit = (fileName, initVal) => {
  let retVal;
  if(fs.existsSync(fileName)) {
    retVal = JSON.parse(fs.readFileSync(fileName, "utf8"));
  } else {
    fs.writeFileSync(fileName, JSON.stringify(initVal));
    retVal = initVal;
  }
  return retVal;
}

let nameList = fileInit("names.txt", []);
let ID = fileInit("IDs.txt", 0);


const server = http.createServer((req, res) => {
  res.end("<h1>Hello</h1>");
});

server.listen(3000,() => {
  console.log("listening on port 3000");
})

