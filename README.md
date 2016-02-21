## Curator Beta

#### Getting Started

1. Run `npm install` or `sudo npm install`
2. Open your terminal and run `./curator --p` to open preview mode.

### Curator Commands

All commands should be preceded by `./curator`. (Ex. `./curator --preview`)  
  
`--preview` or `--p`  
Opens a browser with Curator running in preview mode.
  
`--dev` or `--d`  
Start Curator's development mode to work on your component library. Options can be passed that will narrow the focus of files you want to work on. Most of the time you will just work on your own components, but the look and feel of the Curator app can be changed by editing the core Curator CSS and javascript. It's not recommended but can be done.  
  
**Options**  
  
* `--dev=ui`  
Used to start your component development environment. Starts a watcher on files inside the `styleguide` directory.  
  
* `--dev=core`  
Used to edit Curator CSS and javascript files.  
  
* `--dev=all`  
Used to work on Curator files as well as your component library.

* `--noSync`  
Used in combination with the `--dev` command to prevent BrowserSync from automatically reloading your browser during development.  
  
`--bundle` or `--b`  
Create a static version of your component styleguide. To use in a subdirectory on your server make sure the **Bundle Root** is set correctly in the config. It should be set to the directory path off the server root you would like to place your styleguide.
