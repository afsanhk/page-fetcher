const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// It should take 2 command line arguments:
const args = process.argv.slice(2);
const url = args[0];
const path = args[1];

// If the path exists, return an error:


// It should download the resource at the URL
request(url, (error, response, body) => {
  if(error) {
    console.log(`URL is invalid`)
    return error;
  } 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
  console.log('body length: : ', body.length);

  // To the local path on your machine
  fs.writeFile(path, body, err => {
    if (err) {
      console.log(`File path is invalid`)
      return err;
    }
    // It should print out a message after completion of writing
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
    
  })

});





