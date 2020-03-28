const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const fs = require('fs');
function genIndexHtml(path = "/bundle.js") {
    let indexFile = (`<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="preload" as="font" href="https://fonts.googleapis.com/css?family=Mukta&display=swap"></link>
      <title>News Web App</title>
    </head>
    
    <body>
      <div id="root"></div>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <script src="${path}"></script>
    </body>
    
    </html>`)

    fs.writeFile('./public/index.html', indexFile, (err) => {
        if (err) {
            throw new Error(err);
        }
        else {
            console.log("Index File Updated.")
        }
    })
}
function srcFileBuild() {
    let config = webpackConfig();
    let compiler = webpack(config);
    compiler.run((err, stats) => { // Stats Object
        if (err) {
            console.log(err);
        }
        else if (stats.hasErrors()) {
            console.log(stats.toJson('verbose').errors);
        }
        else {
            let chunkPath = "/" + stats.toJson('verbose').assetsByChunkName.main;
            genIndexHtml(chunkPath);
            console.log("Build Completed Successfully.")
        }
    });
}
function srcFileWatch() {
    let config = webpackConfig("development", "dev-chunks/", "bundle.js");
    let compiler = webpack(config),
        outputLog = {};
    genIndexHtml();
    compiler.watch({
        aggregateTimeout: 300,//delay before rebuilding once the first file changed
        poll: 1000
    }, (err, stats) => {
        if (err) {
            console.log(err);
        }
        else if (stats.hasErrors()) {
            console.log(stats.toJson('verbose').errors);
        }
        else {
            let statsData = stats.toJson('verbose');
            outputLog = {
                compileTime: Math.floor(statsData.time / 1000) + 's',
                warnings: statsData.warnings,
                status: "watching"
            };
        }
        console.log(outputLog);
    });
}

if (process.argv[2] == 'build') { //generates a build for production
    srcFileBuild();
}
else if (process.argv[2] == 'watch') { // generates a build for development
    srcFileWatch();
}