const http = require('http')
const { getPath, getID, nameList, getPostData } = require('./utils')

const server = http.createServer(async (req, res) => {

  let path = getPath(req);

  if (req.method.toUpperCase() === "GET") {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(nameList));
  } // method === "GET"

  if (req.method.toUpperCase() === "POST") {

    let body = await getPostData(req);

    if(path[0] && (path[0].toLowerCase() === "items")) { // replace all
      res.setHeader('Content-Type', 'text/html');
      res.end("<h1>Post All.</h1>");
    } else {
      res.setHeader('Content-Type', 'text/html'); // add one
      res.end("<h1>Post One.</h1>");
    }
  } // method === "POST"

  if (req.method.toUpperCase() === "DELETE") {
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>Delete.</h1>");
  } // method === "DELETE"

});

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})



