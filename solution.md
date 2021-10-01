#Purple Project#

This project is a backend API written in nodejs and running in a Docker container.

The source can be located at the following github.com URL:

https://github.com/CerebralAdvantage/node1

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

======================================

FUTURE UPDATES CHANGES ETC

This is not a full featured REST API.  So in the future, it would be
good to flesh out the details (i.e. handling items by ID). Doing this
in node.js should be a reasonable undertaking.  I have written in a
modular fashion, allowing for new modules (like the "PUT" method)
to be inserted with few changes.  Also, having utilities like getPath()
makes things like extensive routing or working with ID data almost trivial.

Even if it needed to be refactored into something like Java or Go,
the basic building blocks are there to be processed.

======================================

IMPACTS OF THE CHOICES I MADE

I chose to work in pure nodejs, mainly for its precise readability
and lack of hidden processes (from a secure coding perspective).

That might hinder future coders who rely upon things like BodyParser
middleware, an express-friendly package. 

However, the customer has not yet selected particular technologies,
So I opted for (IMHO) optimal.  I always wonder what it would have
looked like written in C.  Surely it would have been fast and scalable.

======================================

NICE TO HAVES

4. I have included some small but interesting features that I thought
were worthy.  A lot of my choices lean toward a more secure back end.
For instance, the choice to write in pure node, vs express or even higher-level
frameworks is driven by what we don't see in code.  What is going on
when a minified megabyte of JavaScript gets dropped on a client's PC
to execute. Coding in vanilla node.js puts a lot of code in a freely
examinable light.

getPath() takes the incoming request and breaks the req.url string into
a string array.  http://localhost:3000/items/9 becomes the array ["items", "9"]
without using regular expressions.

getID() persists a "current ID" on the server, opens the file, reads the value,
increments the value and saves the new value back to disk.  Because node is
single threaded, this is "thread safe".  It returns the new value, but it does
all this without relying on uuid or other 3rd party code.

On a slightly less security-related track, fileInit handles data management
by taking a "start value" (yes, like React) and if the fileName does not exist
locally, begins by using the start value.  However, if the data has been altered
and saved, the latest data gets read in. This is used to manage IDs and possibly
the list of names.

2. The port is easily changeable outside of code in a few ways.
If an environemnt variable "PORT" exists, that is used within the
server.js code.  If none exist, the default is port 3000.
As explained above, the one-line "run" command includes a port
connectivity phrase (like 3000:3000) which patches the "expected"
port to the port that the server is running.  This sort of counts as
a one-line run command and an easy to use port change configuration
that does not rely on altering the source code.


