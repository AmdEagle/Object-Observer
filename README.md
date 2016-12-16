# Object-Observer

This Javascript is written on top of the new ES6 Proxy feature to Observe a JSON Object.

## Usage

1. import module Observe into your project.
2. Pass the JSON Object you would like to observe.e.g. let obj = Observe.watch( obj, callback );
3. UnSubscribe from object observe. e.g. let obj = Observe.unwatch( obj );


## Example of Usage

```javascript
import Observe from './observe';

let obj = 
{
    a: 10,
    b: 50,
    c: { x: 10, y: 15, z: 33 }
};

//Subscribe to Observr the object
let obj = Observe.watch( obj, onObjectChanged );

function onObjectChanged( res ){
   // Your logic goes here...
}

//UnSubscribe to Observe the object
let obj = Observe.unwatch( obj );
```
