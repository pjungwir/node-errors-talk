var http = require('http');
var exec = require('child_process').exec;
var url = require('url');
var domain = require('domain');
var cluster = require('cluster');
var longjohn = require('longjohn');
var cpus = require('os').cpus().length;
if (cpus < 4) cpus = 4;

function encodeLaughTracks(infile) {
  for (var i = 1; i <= 3; i++) {
    var cmd = "../laugh.rb -q " + i + " " + infile;
    console.log(cmd);
    exec(cmd, function (error, stdout, stderr) {
      if (error) throw error;
      console.log("finished adding laughs to " + infile);
    });
  }
}

if (cluster.isMaster) {
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('disconnect', function(worker) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });

} else {
  http.createServer(function(request, response) {
    var d = domain.create();
    d.on('error', function(err) {
      console.log(err.stack);

      try {
        // Ten minutes to let other connections finish:
        var killTimer = setTimeout(function() {
          process.exit(1);
        }, 10 * 60000);
        killTimer.unref(); // Don't keep running just for the timer!:
        cluster.worker.disconnect(); // Stop taking new requests:
      } catch (err2) {
        console.log("Error handling error!: " + err2);
      }
    });

    d.add(request);  // Explicit binding
    d.add(response); // Explicit binding

    d.run(function() {
      var queryData = url.parse(request.url, true).query;
      var infile = queryData['file'];
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
}

