const http = require('http')
const { fileInit, getID, nameList, getPostData } = require('./utils')

const server = http.createServer(async (req, res) => {
  let path = req.url;

  if (req.method.toUpperCase() === "GET") {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(nameList));
  }

  if (req.method.toUpperCase() === "POST") {

    let body = await getPostData(req);

//check url

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



