#Purple Project#

This project is a backend API written in nodejs and running in a Docker container.

======================================
To build the docker container:

From the cmd line, navigate to the project file.
There should be a file called Dockerfile in that directory.
This is what docker uses for its commands.
Type the following at the cmd line:

docker build --tag minime:1.0.0 .

The "--tag" gives the container a usable name (shown here with a version)
Don't forget the '.' at the end of the line.
That is where docker looks for the Dockerfile
This command builds the conatiner with the tag "minime:1.0.0"

======================================
To run the server in the docker container:

docker run -p 3001:3000 --name johnny -d minime:1.0.0

The "-p 3001:3000" is what maps the port that your URL browses to
  ( i.e. http://localhost:3001 )
to the port that the container is serving from.
As shipped, the server if schduled to serve from port 3000, unless
there is an environment veriable PORT set to a different port value.
You can change that port in the docker run command, but you need to
at least include "-p 3000:3000" if you want to connect to the container.

Once you have a running image you can stop and restart the image,
with all the settings intact, by using the commands:

docker stop johnny
docker start johnny

in this case "johnny" was the name (--name) that we assigned, above.

======================================
To test the server, locally and in the docker container:
1. at the cmd line, type 
node server.js

2. in Visual Studio Code, make sure you have the REST Client extension

3. in VS Code, open the text file "route.rest" you should be able to
send requests to the URL by clicking on the words "Send Request", in grey lettering.

4. if you are running in a docker container and have mapped a local port to the port exposed by the docker image, simply make sure you are using your local port number.
> docker build --tag jammy .
> docker run -p 4000:3000 --name Armistead -d jammy

I have mapped 'local' port 4000 to the port that the running docker uimage has exposed, so in my route.rest file I would change
GET http://localhost:3000/items
(which worked fine when I was running from my command line), to
GET http://localhost:4000/items
And the http "send request"s should work fine.


When run, this code creates two files: names.txt and IDs.txt
unless they already exist, in which case it uses them for long-term
ad-hoc persistent storage.  Currently, only the IDs are utilized in this manner,
but it should be trivial to save and restore the list of name items.




