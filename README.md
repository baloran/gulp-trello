[![Dependency Status](https://david-dm.org/baloran/gulp-trello.svg?style=flat)](https://david-dm.org/baloran/gulp-trello)
[![devDependency Status](https://david-dm.org/baloran/gulp-trello/dev-status.svg?style=flat)](https://david-dm.org/baloran/gulp-trello#info=devDependencies)

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

gulp.task('default', function () {
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
- listName: Its the list name. Warning it is case sensitive!
- key: Go on this [page](https://trello.com/app-key) to copy the key.
- Token: Use this url to generate one:
```
https://trello.com/1/connect?key=YOURKEY&name=Gulp-todo&response_type=token&scope=read,write&expiration=never
```

## Contributing

Pull requests are welcome.