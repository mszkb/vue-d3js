<template>
  <svg width="960" height="500" ref="svg"></svg>
</template>

<script>
  import * as d3 from "d3";

  const nodes = [
    {"id": 0, "label": "i0", "layer": 1, "connection": [2, 6]},
    {"id": 1, "label": "i1", "layer": 1, "connection": [4, 5, 6]},
    {"id": 2, "label": "h0", "layer": 2,},
    {"id": 3, "label": "i2", "layer": 1},
    {"id": 4, "label": "h1", "layer": 2},
    {"id": 5, "label": "h2", "layer": 2, "connection": [7]},
    {"id": 6, "label": "h3", "layer": 2, "connection": [7]},
    {"id": 7, "label": "o0", "layer": 3}
  ]

  const nodeSize = 30;

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data () {
      return {
        svg: null
      }
    },
    mounted: function () {
      var margin = {top: -5, right: -5, bottom: -5, left: -5},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      let svg = d3.select(this.$el).call(d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform)
      }))
      this.$data.svg = svg
      let color = d3.scaleOrdinal(d3.schemeCategory10)

      const netsize = {}
      nodes.forEach((d) => {
        if (d.layer in netsize) {
          netsize[d.layer] += 1
        } else {
          netsize[d.layer] = 1
        }
        d["lidx"] = netsize[d.layer]
        d["connection"] = d.connection
      })

      let largestLayerSize = Math.max.apply(null, Object.keys(netsize).map((i) => {
        return netsize[i]
      }))
      let xdist = width / Object.keys(netsize).length
      let ydist = height / largestLayerSize

      // Position von allen orbs - Layer fuer Layer
      // jeder Layer faengt oben an und die nodes haben 0.5 Abstand untereinander
      nodes.map((d) => {
        d["x"] = (d.layer - 0.5) * xdist
        d["y"] = (d.lidx - 0.5) * ydist
      })

      let links = []
      nodes.map(function (d, i) {
        for (let n in nodes) {
          if (d.layer + 1 === nodes[n].layer) {
            // parseInt(n) is the target on the next layer
            // determine if two nodes are related:
            //  datastructure needs an ID

            let connected = false
            if (d.connection !== undefined) {
              connected = d.connection.includes(parseInt(n))
            }

            links.push({
              "source": parseInt(i),
              "target": parseInt(n),
              "sourceLabel": nodes[i].label,
              "targetLabel": nodes[n].label,
              "value": 1,
              "connected": connected
            })
          }
        }
      })

      svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", function (d) {
          return `${d.sourceLabel} ${d.targetLabel} link`
        })
        .attr("x1", function (d) {
          return nodes[d.source].x
        })
        .attr("y1", function (d) {
          return nodes[d.source].y
        })
        .attr("x2", function (d) {
          return nodes[d.target].x
        })
        .attr("y2", function (d) {
          return nodes[d.target].y
        })

      let node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("transform", function (d) {
          return `translate(${d.x}, ${d.y})`
        })


      function recursiveActive(e) {
        if (e.connection === undefined)
          return

        e.connection.map((x) => {
          d3.selectAll(`.${e.label}.${nodes[x].label}`).classed('active', true)
          recursiveActive(nodes[x])
        })
      }

      node.append("circle")
        .attr("class", function (d) {
          let availableLinks = links.filter((x) => {
            return x.source === d.id && x.connected
          })

          let CSSclasses = []
          availableLinks.map((x) => {
            CSSclasses.push(x.sourceLabel)
            CSSclasses.push(x.targetLabel)
          })

          return CSSclasses.join(" ")
        })
        .attr("r", nodeSize)
        .style("fill", function (d) {
          return color(d.layer)
        })
        .on("click", function (e) {
          d3.selectAll('.active').classed('active', false)
          recursiveActive(e)
        })

      node.append("text")
        .attr("dx", "-.35em")
        .attr("dy", ".35em")
        .text(function (d) {
          return d.label
        })
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  @keyframes lineMove {
    to {
      stroke-dashoffset: 0;
    }
  }

  line {

  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  text {
    pointer-events: none;
  }

  .node:hover {
    stroke: #999;
    stroke-opacity: .6;
    stroke-width: 4px;
  }

  .link {
    stroke: #999;
    stroke-opacity: .6;
    stroke-width: 2;
  }

  .active {
    stroke: #ff0000;

  }

  line.active {
    stroke-dashoffset: 105;
    stroke-dasharray: 33, 2;
    animation: lineMove 2s infinite linear;
  }

</style>
