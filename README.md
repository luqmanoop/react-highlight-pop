# react-highlight-pop
> React component for "medium-like" text highlight

[![](https://img.shields.io/npm/v/react-highlight-pop.svg?style=popout)](https://www.npmjs.com/package/react-highlight-pop)
[![](https://img.shields.io/travis/codeshifu/react-highlight-pop.svg?style=popout)](https://travis-ci.org/codeshifu/react-highlight-pop)
[![](https://img.shields.io/coveralls/github/codeshifu/react-highlight-pop.svg?style=popout)](https://coveralls.io/github/codeshifu/react-highlight-pop)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A configurable text highlight component with zero dependencies.

![demo](https://user-images.githubusercontent.com/5154605/52847235-ebae9800-310b-11e9-9387-e3797fa4bdae.gif)

## Installation
```bash
npm install react-highlight-pop
```

## Usage
1. Import/require `react-highlight-pop` after installation
```javascript
import HighlightPop from 'react-highlight-pop';
```
or 
```javascript
const HighlightPop = require('react-highlight-pop');
```
2. Wrap the text you want to be highlightable with `react-highlight-pop`
```javascript
const App = () => {
    return (
        <HighlightPop>
            <p>You can highlight me</p>
            <p>I will show a popover when you highlight me</p>
        </HighlightPop>
    )
}
```

### Custom popover items
You can define custom popover items by defining the `popoverItems` prop, whose value is a function that returns jsx.

NOTE: You should always pass your custom popover items.

Example
```javascript
const App = () => {
    return (
        <HighlightPop 
            popoverItems={itemClass => (
             <Fragment>
                <span 
                    className={itemClass} onClick={() => alert('sharing')}>
                    share
                </span>
             </Fragment>
            )}>
            <p>You can highlight me</p>
            <p>I will show a popover when you highlight me</p>
        </HighlightPop>
    )
}
```

# API
## Props
prop|value|description
---|---|---
popoverItems|function| A function that returns jsx. Returned jsx display as popover items when a text is highlighted.
onHighlightPop|function| Callback function that's invoked whenever a text is highlighted.
children|node| The text/group of text that's highlightable

## Contributing
1. Fork the repo 
2. Create your feature branch (`git checkout -b my-awesome-feature`)
3. Make changes to the lib file `src/lib/index.js`
4. Write test for changes/features added in `__tests__/HighlightPop.test.js`
5. Commit your changes (`git commit -am 'Awesome feature added'`)
6. Push to the branch (`git push origin my-awesome-feature`)
7. Raise a Pull Request

## License
[MIT](https://github.com/codeshifu/react-highlight-pop/blob/master/LICENSE.md)
