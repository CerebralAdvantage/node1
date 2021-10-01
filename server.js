const http = require('http')
const { getPath, getID, nameList, getPostData } = require('./utils')
let theList = [...nameList];

const server = http.createServer(async (req, res) => {

  let path = getPath(req);

  if (req.method.toUpperCase() === "GET") { // this should return all name/id objects
    // it will work for /items, as well as / (default)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(theList));
  } // method === "GET"

  if (req.method.toUpperCase() === "POST") {

    let body = await getPostData(req);

    if(path[0] && (path[0].toLowerCase() === "items")) { // replace all
      let i, bodyobj = JSON.parse(body);
      theList = [];
      for(i=0;i<bodyobj.length;i++) {
        theList.push({"id":getID(), "name":bodyobj[i]["name"]})
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(theList));

    } else {
      res.setHeader('Content-Type', 'text/html'); // add one
      res.end("<h3>Not Implemented - POST to /items.</h3>");
    }
  } // method === "POST"

  if (req.method.toUpperCase() === "DELETE") {
    if(path[0] && (path[0].toLowerCase() === "items")) { // delete all
      res.setHeader('Content-Type', 'application/json');
      theList = [];
      res.end(JSON.stringify(theList));
    } else {
      res.setHeader('Content-Type', 'text/html'); // delete ?
      res.end("<h3>Not Implemented - DELETE to /items.</h3>");
    }
  } // method === "DELETE"

});

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})



