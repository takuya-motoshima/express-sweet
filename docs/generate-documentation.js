/**
 * Compile the templates in the demo/ directory and output them as HTML in the docs/v1 directory.
 */
const path = require('path');
const {File} = require('nodejs-shared');
const hbs = require('express-hbs-compile');

// Find the hbs file.
const templates = File.find(path.join(__dirname, 'src/*.hbs'));

// Generate compiler.
const render = hbs({
  viewsDir: path.join(__dirname, 'src'),
  partialsDir: path.join(__dirname, 'src/partials'),
  layoutsDir: path.join(__dirname, 'src/layout'),
  defaultLayout: path.join(__dirname, 'src/layout/default.hbs'),
  extname: '.hbs',
});

// // If the docs/ directory does not exist, create it.
// File.makeDirectory(path.join(__dirname, 'docs'));

(async () => {
  const version = 'v1';
  let i = 0;
  for (let template of templates) {
    // Compile template.
    let content = await render(template, {
      currentPath: `/${File.basename(template)}`,
    });

    // HTML file path.
    const html = path.join(__dirname, `${version}/${File.basename(template)}.html`)

    // Write HTML file.
    File.write(html, content);
    console.log(`Write ${html} (${++i}/${templates.length})`);
  }
})();