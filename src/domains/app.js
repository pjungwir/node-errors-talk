var http = require("http");
var exec = require('child_process').exec;
var url = require('url');
var domain = require('domain');

function notifyCaller(infile, success) {
  console.log("finished adding laughs to " + infile);
}

function encodeLaughTracks(infile) {
  for (var i = 1; i <= 3; i++) {
    var cmd = "../laugh.rb -q " + i + " " + infile;
    console.log(cmd);
    exec(cmd, function (error, stdout, stderr) {
      if (error) throw error;
      notifyCaller(infile, true);
    });
  }
}

http.createServer(function(request, response) {
  var d = domain.create();
  var queryData = url.parse(request.url, true).query;
  var infile = queryData['file'];

  d.on('error', function(err) {
    console.log(err);
    notifyCaller(infile, false);
  });
  
  d.run(function() {
    if (infile.match(/^[a-zA-Z0-9._\-]+$/)) {
      encodeLaughTracks(infile);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("okay\n");
      response.end();
    } else {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write("bad input\n");
      response.end();
    }
  });
}).listen(8086);

