A basic 'particle tracks' visualization styled after iconic images from the [Big European Bubble Chamber (BEBC)](https://home.cern/news/news/experiments/seeing-invisible-event-displays-particle-physics).

See [my personal site](https://www.danielporter.ca) for a demo.

![screenshot](https://raw.githubusercontent.com/thelemonyfresh/particle-tracks/master/dist/particle-tracks-screenshot.png)

## Install
#### NPM
``` shell
npm install thelemonyfresh/particle-tracks
```
Then require the library in your js (`import 'particle-tracks'`).

#### Plain ol' HTML
Download the `/dist/main.js` library to a known location, then simply import via a script tag:

``` html
<script src="main.js" type="text/javascript"></script>
```

## Use
Once imported, `ParticleTracks` can be accesses on the main `window` object, and needs to be initialized with `container`, the class name of an element where the visualization will render:

``` javascript
ParticleTracks.init({ container: "<class-name-of-target>" });
```

See `dist/index.html` for a basic example.
