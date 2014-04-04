var Face = require('../..').Face;
var Name = require('../..').Name;
var Interest = require('../..').Interest;
var Data = require('../..').Data;
var DataUtils = require('../..').DataUtils;
var MetaInfo = require('../..').MetaInfo;
var Closure = require('../..').Closure;
var DataUtils = require('../..').DataUtils;
var MimeType = require('../..').MimeType;
var fileSystem = require("fs");
var SizeChunker = require("../../chunk-by-size.js");

var interestName,i=0, error1 = false;
function onInterest(prefix, interest, transport)
{
  	var UriParts = interest.name.toUri().split("/");
  	var requestedFileName = UriParts[1]+"/"+UriParts[2]; i =0;
  	var segment = UriParts[4];
    if(segment != undefined)
    {
      segment = DataUtils.bigEndianToUnsignedInt(segment);
    }
  	console.log("\n\nInterest received : " + interest.name.toUri());
	console.log("Requested File Name along-with path: "+ requestedFileName);
	error1 = false;
    // requestedFilePath = " ----File Directory Path---- " + requestedFileName;
    try {
    	var stats = fileSystem.statSync(requestedFileName);
    	var filesizeInBytes = stats["size"];
    	var chkvar = filesizeInBytes / 4096;
    	var numofPackets = Math.floor(filesizeInBytes / 4096);
    	var remainder = filesizeInBytes % 4096;
    	if(remainder!=0)
    	numofPackets++;
    	if(numofPackets-1 != 0)
        var finalBlockID = new Name().appendSegment(numofPackets-1).get(-1);
   		else
   		var finalBlockID = new Name().appendSegment(0).get(-1);
   		console.log("Total NDN Packets: "+ numofPackets);
   		}
   	catch(e){
      console.log("In catch 1 \n");
   		error1 = true;
   		var name = new Name(interestName);
   		var finalBlockID = name;
    	var buf = new Buffer("<h2>Error 212<h2><br><br><br> <b>File Not Found</b>");
	    var data = new Data(name, new MetaInfo(), buf);
	    console.log("Interest served: " + name.toUri());
	    data.getMetaInfo().setFinalBlockID(finalBlockID);
	    data.sign();
	    var encodedData = data.wireEncode();// Encoding data packet
    	transport.send(encodedData.buf()); // Sending encoded data in response to request
   	}	
    if(error1 == false)
    {
		fileSystem.readFile(requestedFileName, function (err, fileData) {
        var version = new Date();
  		interestName = interest.name.toUri();
  		name = new Name(interestName);
  		name.appendVersion(version);
        i=0; // Initializing 
        if (!err) {
		// If reading file successful	        	
        var input = fileSystem.createReadStream(requestedFileName),
    	chunker = new SizeChunker({
        chunkSize: 4096          // Declaring size of data chunks we want
    	});
			
		chunker.on('chunkStart', function(id, done) {
    		done();
		});
			
		chunker.on('chunkEnd', function(id, done) {
    		done();
		});
		
		chunker.on('data', function(dat) 
		{
			var name = new Name(interestName);
			var buf = new Buffer(dat.data);
			console.log("Buffer Length: "+ buf.length);
			if(buf.length != 0){  	
			    if(segment == undefined)	// In case the requested URI does not have segment number, we append segment number
	        	{
            		//console.log("\n Buffer: "+ buf +"\n");
              		var data = new Data(name.appendVersion(version).addSegment(i++), new MetaInfo(), buf);
                	data.getMetaInfo().setFinalBlockID(finalBlockID);
                	data.sign();
                	var encodedData = data.wireEncode(); // Encoding data packet
                	transport.send(encodedData.buf()); // Sending encoded data in response to request
	           }
               else
               {
                	console.log("Segment: "+segment +" Seg: "+i);
                	var data = new Data(name, new MetaInfo(), buf);
                	data.getMetaInfo().setFinalBlockID(finalBlockID);
                	data.sign();
                	var encodedData = data.wireEncode(); // Encoding data packet
                	transport.send(encodedData.buf()); // Sending encoded data in response to request
                	i++;
             }
             console.log("Interest served: " + name.toUri() + " Segment number"+ i);}
			});
				input.pipe(chunker);
    		}
    			else {
    				var name = new Name(interestName);
    				var buf = new Buffer("Error 213 File Could Not Be Read");
	    			var data = new Data(name, new MetaInfo(), buf);
	    			data.sign(); 
	    			var encodedData = data.wireEncode(); // Encoding data packet
    				transport.send(encodedData.buf()); // Sending encoded data in response to request
    			}
    		});
    	}
}

function onRegisterFailed(prefix) 
{
  console.log("Register failed for prefix " + prefix.toUri());
  face.close();  // This will cause the script to quit.
}
var name = "/try" + interestName;
var face = new Face({host: "localhost"});
face.registerPrefix(new Name(interestName), onInterest, onRegisterFailed);
console.log("Started.....");