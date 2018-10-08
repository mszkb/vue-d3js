# vue-d3js neuronal network visualization

This is a little experimentation of visualization of an neuronal network.  
Goal: Little boilerplate for d3js for vue later on  
Features an example of a datastructure to create a neuronal network with "related" nodes. A click listener for visualize the related nodes

## Project setup
```
npm i

yarn install
```

### Compiles and hot-reloads for development
```
npm run serve

yarn serve
```

### Compiles and minifies for production
```
npm run build

yarn build
```

### Lints and fixes files
```
npm run lint

yarn lint
```

## Features

### Detect active nodes

Related nodes have the same CSS class as the clicked node and they get the CSS class `active`.
Furthermore it will be searched for the CSS class of the related one and they will be `active` aswell.  
Links/Lines have the CSS class of the source node and the destination node

### Click events

When append a new element add the `on` function with first argument be "click" and the second a callback function

````javascript
node.append("circle")
.on("click", function (e) {
  // your code
})
````

### Zoom

Select the svg or a group which should be zoomed. 

````javascript
let svg = d3.select(this.$el).call(d3.zoom().on("zoom", function () {
  svg.attr("transform", d3.event.transform)
}))
````

### Known Bugs

On Touchscreen Notebooks the zooming freaks out and is the fast

## Credits

Based on   
[Lucy Park - bl.ocks.org - Drawing a neural network](https://bl.ocks.org/e9t/6073cd95c2a515a9f0ba)
[SVG-Animation](https://blog.fullstackdigital.com/creating-an-animated-dashed-line-background-with-svg-and-css-170f89f47000)  
[D3js Zoom Code](https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js)  
[D3 Zoom and Drag](https://bl.ocks.org/mbostock/6123708)
 
