Convert and replace the `src` of the images in your HTML files.

## Example

##### gulpfile.js

```js
var gulp = require('gulp');
var rewriteImagePath = require('gulp-rewrite-image-path');

gulp.task('default', function () {
  gulp.src('index.html')
    ...
    .pipe(rewriteImagePath({path:"build/images"}))
    ...
});
```


##### Before:

```html
<html>
  <head>
  </head>
  <body>
    <img src="sample1.png" />
    <img src="subdirectory/sample2.png" />
    <img src="https://www.wikipedia.org/static/favicon/wikipedia.ico" />
...
```


##### After:

```html
<html>
  <head>
  </head>
  <body>
    <img src="build/images/sample.png">
    <img src="build/images/subdirectory/sample2.png" />
    <img src="https://www.wikipedia.org/static/favicon/wikipedia.ico" />
...
```


### License

MIT © lagartoflojo
