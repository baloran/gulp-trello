# Gulp Todo

> A trello plugin for gulp.

Add some card in your [trello](trello.com) board with swag.

```javascript
/**
 * Todo:
 *    - Fix the world
 */
```

## Installation

Install via [npm](https://npmjs.org/package/gulp-trello):
```
npm install gulp-trello --save-dev
```

## Exemple
```js
var gulp = require('gulp');
var trello = require('gulp-trello');

gupl.task('default', function () {
  return gulp.src('app.js')
          .pipe(trello({
            board: 'YOUR BOARD NAME',
            listName: 'YOUR LIST NAME',
            key: 'YOUR KEY',
            token: 'YOUR TOKEN (see below)'
        }));
});
```

### Configuration

- Board its your board id: You can retrieve easily it in the url. Its just before the board name.
- listName: Its the list name. Warning is case sensitive!
- key: Go on this [page](https://trello.com/app-key) for copy the key.
- Token: Use this url for generate one:
```
https://trello.com/1/connect?key=YOURKEY&name=Gulp-todo&response_type=token&scope=read,write&expiration=never
```

## Contributing

Pull request are welcome.