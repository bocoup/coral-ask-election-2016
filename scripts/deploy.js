
const exec = require('child_process').exec;
const config = require('../public/config.json');


let s3Bucket = config.s3Bucket;

if (!s3Bucket) {
  console.log('ERROR: public/config.json requires a s3Bucket attribute to deploy')
  process.exit();
}

console.log('DEPLOYING TO: ' + s3Bucket)

const cmd = 'aws s3 cp --recursive ./build ' + s3Bucket;

const deployProcess = exec(cmd);

deployProcess.stdout.on('data', function(data) {
  console.log(data);
});
