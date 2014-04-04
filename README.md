NDN WebServer

Pre-requisites:

Node.js, 
ndnd-tlv, 
ndn-protocol firefox add-on

Steps:

    Run web-server.js under path ndn-js/application/ndn-webserver like this:

    node web-server.js

    Set hub host as "localhost:6363" by clicking on set icon in NDN Protocol Firefox Add-On

    Enter NDN URI (for this application try: ndn:/webdir/test1.html, ndn:/webdir/test2.html) [webdir is the directory containing html, js, css files]

    Observe the interests being received and served in terminal (server log)
