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

// EDGE CASE: If the path exists, initaite a readline, if y + enter, then execute rest of code, otherwise end.
// fs.access only returns an error if the file does NOT exist. So if no error, then the file exists!
fs.access(path, fs.constants.F_OK, (err) => {
  if (!err) {
    console.log(`File exists!`);
    rl.question(`Would you like to overwrite the existing file? Press y, followed by enter for yes. \n> `, answer => {
      if (answer === 'y') {
        // It should download the resource at the URL
        request(url, (error, response, body) => {
          // EDGE CASE: Return an error if the URL is invalid. 
          if(error) {
            console.log(`URL is invalid`)
            return error;
          } 
        
          // To the local path on your machine
          fs.writeFile(path, body, err => {
            if (err) {
              console.log(`File path is invalid \n ${err}`)
              process.exit();
            }
            // It should print out a message after completion of writing
            return console.log(`Downloaded and saved ${body.length} bytes to ${path}`)          
          })
        });
      } rl.close()
    })
    // If the file doesn't exist, just download the file:
  } else {
      request(url, (error, response, body) => {
      if(error) {
        console.log(`URL is invalid`)
        return error;
      } 

      fs.writeFile(path, body, err => {
        if (err) {
          console.log(`File path is invalid \n ${err}`)
          process.exit();
        }
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
        process.exit()          
      })
  })}  
})