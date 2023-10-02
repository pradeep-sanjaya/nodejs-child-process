var child_process = require('child_process');

var numOfCore  = require('os').cpus().length;
console.log(`Number of cpus ${numOfCore}`, numOfCore);
var done = 0;

for (var i = 0; i < numOfCore; i++){
  var child = child_process.fork('./child');
  child.send((i + 1) * 1000);
  child.on('message', function(message) {
    console.log('[parent] received message from child:', message);
    done++;
    if (done === numOfCore) {
      console.log('[parent] received all results');
    }
  });
}
