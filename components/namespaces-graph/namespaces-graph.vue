<template>
  <div class="knowledge-graph" ref="graph" />
</template>

<script setup name="namespacesGraph" lang="js">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'
import { EXTERNAL_COLOR, FLANDERS_COLOR } from '~/constants/constants'
import { isVlaanderenUrl } from '~/utils/helper.utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const graph = ref(null)
let svg = null
let simulation = null
let nodeGroup = null
let link = null
let label = null

// Store visualization state to allow resizing
const visualizationState = ref({
  width: 0,
  height: 0,
  nodes: [],
  links: [],
})

// Navigate to standard detail page
const navigateToStandard = (url) => {
  if (!url) return
  window.open(url, '_blank')
}

// Add resize listener
const handleResize = () => {
  if (graph.value && visualizationState.value.nodes.length > 0) {
    // Update the SVG dimensions
    updateVisualizationSize()
  }
}

// Update visualization size based on container size
const updateVisualizationSize = () => {
  if (!graph.value || !svg) return

  // Get the current container dimensions
  const containerWidth = graph.value.clientWidth
  const containerHeight = graph.value.clientHeight

  // Update stored dimensions
  visualizationState.value.width = containerWidth
  visualizationState.value.height = containerHeight

  // Update SVG dimensions
  svg
    .attr('width', containerWidth)
    .attr('height', containerHeight)
    .attr('viewBox', [0, 0, containerWidth * 2, containerHeight * 2])

  // Update the simulation forces to match new dimensions
  if (simulation) {
    simulation
      .force('center', d3.forceCenter(containerWidth, containerHeight))
      .alpha(0.3)
      .restart()
  }
}

onMounted(async () => {
  try {
    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Fetch data from GitHub
    const response = await fetch(import.meta.env.VITE_NAMESPACES_STATISTICS_URL)
    const rawData = await response.json()

    // Transform the data to match the expected format
    const standardsMap = new Map() // Use a Map to track unique standards by title

    // Process each specification in the raw data
    for (const specId in rawData) {
      const spec = rawData[specId]

      // Skip entries without proper data
      if (
        !spec.title ||
        !spec.namespaces ||
        Object.keys(spec.namespaces).length === 0
      ) {
        continue
      }

      const title = spec.title

      // Get existing standard or create a new one
      if (!standardsMap.has(title)) {
        // First time seeing this title, create a new standard
        standardsMap.set(title, {
          title: title,
          'Zonder AP/VOC': title.split(' ').pop(),
          organization: spec.organization || 'Unknown Organization',
          'Organization Reference': spec.organizationReference || '',
          domain: spec.domain || 'Unknown Domain',
          namespaces: [],
          url: spec.navigation.self,
        })
      }

      // Get the standard object to add namespaces
      const standard = standardsMap.get(title)

      // Add namespaces from this specification
      for (const nsUri in spec.namespaces) {
        standard.namespaces.push({
          uri: spec.namespaces[nsUri],
          isVlaanderen: isVlaanderenUrl(nsUri),
        })
      }
    }

    // Convert the map to an array and filter standards without namespaces
    const standards = Array.from(standardsMap.values()).filter(
      (standard) => standard.namespaces.length > 0,
    )

    // Get container dimensions
    const containerWidth = graph.value.clientWidth
    const containerHeight = graph.value.clientHeight

    visualizationState.value.width = containerWidth
    visualizationState.value.height = containerHeight

    // Create SVG with responsive dimensions
    svg = d3
      .select(graph.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, containerWidth, containerHeight])
      .attr('preserveAspectRatio', 'xMidYMid meet')

    // Extract all unique namespaces
    const allNamespaces = new Set()
    standards.forEach((standard) => {
      standard.namespaces.forEach((ns) => {
        allNamespaces.add(ns.uri)
      })
    })

    const namespaceArray = Array.from(allNamespaces).map((uri) => {
      const isVlaanderen = isVlaanderenUrl(uri.toString())
      return { uri, isVlaanderen }
    })

    // Create nodes for standards and namespaces
    const nodes = [
      ...standards.map((d) => ({
        id: d.title,
        group: 'standard',
        domain: d.domain,
        url: d.url,
      })),
      ...namespaceArray.map((d) => ({
        id: d.uri,
        group: 'namespace',
        isVlaanderen: d.isVlaanderen,
      })),
    ]

    // Store nodes in state for resizing
    visualizationState.value.nodes = nodes

    // Create links between standards and namespaces
    const links = []
    standards.forEach((standard) => {
      standard.namespaces.forEach((ns) => {
        links.push({
          source: standard.title,
          target: ns.uri,
          value: 1,
        })
      })
    })

    // Store links in state for resizing
    visualizationState.value.links = links

    // Color scales
    const colorScale = d3
      .scaleOrdinal()
      .domain(['standard', 'namespace'])
      .range(['#4682b4', '#b44682'])

    const namespaceColorScale = d3
      .scaleOrdinal()
      .domain([true, false])
      .range([FLANDERS_COLOR, EXTERNAL_COLOR])

    // Track if we're currently dragging to avoid navigating during drag
    let isDragging = false

    // Convert functions to arrow functions
    const dragstarted = (event, d) => {
      isDragging = true
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = (event, d) => {
      d.fx = event.x
      d.fy = event.y
    }

    const dragended = (event, d) => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
      // Set a small timeout to allow click events to fire after drag ends
      setTimeout(() => {
        isDragging = false
      }, 100)
    }

    // Create the force simulation
    simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-120))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(10),
      )
      .force('center', d3.forceCenter(containerWidth, containerHeight))
      .force('x', d3.forceX())
      .force('y', d3.forceY())

    // Create container for layering - links go first (at the bottom)
    const linkLayer = svg.append('g').attr('class', 'link-layer')
    const labelLayer = svg.append('g').attr('class', 'label-layer') // Labels on top of nodes
    const nodeLayer = svg.append('g').attr('class', 'node-layer') // Nodes on top

    // Create links
    link = linkLayer
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1.5)
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)

    // Create node groups
    nodeGroup = nodeLayer
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', (d) => `node-group ${d.group}`)
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    // Add invisible larger circles for better hover detection
    nodeGroup
      .append('circle')
      .attr('r', (d) => (d.group === 'standard' ? 20 : 16)) // Larger invisible circle
      .attr('fill', 'transparent')
      .attr('class', 'hover-area')
      .style('cursor', (d) => (d.group === 'standard' ? 'pointer' : 'move'))

    // Add visible circles
    const node = nodeGroup
      .append('circle')
      .attr('r', (d) => (d.group === 'standard' ? 10 : 8))
      .attr('fill', (d) => {
        if (d.group === 'standard') {
          return colorScale(d.group)
        } else {
          return namespaceColorScale(d.isVlaanderen)
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('class', 'node-circle')

    // Add labels
    label = labelLayer
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('dx', '1rem')
      .attr('font-size', (d) => (d.group === 'standard' ? '4rem' : '3rem'))
      .attr('opacity', 0)
      .text((d) => {
        if (d.group === 'namespace') {
          // Truncate long NS
          const uri = d.id.toString()
          return uri
        }
        return d.id
      })

    // Add tooltips for full namespace URIs
    nodeGroup.append('title').text((d) => d.id)

    // Add click handler for standard nodes
    nodeGroup.on('click', (event, d) => {
      event.stopPropagation() // Prevent event bubbling
      navigateToStandard(d?.url)
    })

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${containerWidth - 600}, 40)`)

    // Standards legend
    legend
      .append('circle')
      .attr('r', 6)
      .attr('fill', colorScale('standard'))
      .attr('cx', 0)
      .attr('cy', 0)

    legend
      .append('text')
      .attr('x', 15)
      .attr('y', 0)
      .attr('dy', '0.5rem')
      .attr('font-size', '2.5rem')
      .text('Data Standards')

    legend
      .append('circle')
      .attr('r', 6)
      .attr('fill', namespaceColorScale(true))
      .attr('cx', 0)
      .attr('cy', 38)

    legend
      .append('text')
      .attr('x', 15)
      .attr('y', 40)
      .attr('dy', '0.5rem')
      .attr('font-size', '2.5rem')
      .text('Namespace (data.vlaanderen.be)')

    legend
      .append('circle')
      .attr('r', 6)
      .attr('fill', namespaceColorScale(false))
      .attr('cx', 0)
      .attr('cy', 75)

    legend
      .append('text')
      .attr('x', 15)
      .attr('y', 80)
      .attr('dy', '0.5rem')
      .attr('font-size', '2.5rem')
      .text('Namespace (other)')

    // Handle simulation updates
    simulation.on('tick', () => {
      // Update links
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      // Update node groups (both visible and invisible circles)
      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`)

      // Update labels
      label.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })

    // Highlight connected nodes and links on hover
    nodeGroup
      .on('mouseover', (event, d) => {
        // Scale up the hovered node for better visibility
        d3.select(event.currentTarget)
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('r', (d) => (d.group === 'standard' ? 15 : 12))

        // Reduce opacity of all elements
        link.attr('stroke-opacity', 0)
        nodeGroup.style('opacity', 0.1)
        label.attr('opacity', 0)

        const connected = [d.id]
        links.forEach((l) => {
          if (l.source.id === d.id) connected.push(l.target.id)
          if (l.target.id === d.id) connected.push(l.source.id)
        })

        // Highlight connected links
        link
          .filter((l) => l.source.id === d.id || l.target.id === d.id)
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 2)

        // Highlight connected nodes
        nodeGroup.filter((n) => connected.includes(n.id)).style('opacity', 1)

        // Show labels for connected nodes
        label.filter((n) => connected.includes(n.id)).attr('opacity', 1)
      })
      .on('mouseout', (event) => {
        // Reset node size
        d3.select(event.currentTarget)
          .select('.node-circle')
          .transition()
          .duration(200)
          .attr('r', (d) => (d.group === 'standard' ? 10 : 8))

        // Reset all elements
        link.attr('stroke-opacity', 0.6).attr('stroke-width', 1.5)
        nodeGroup.style('opacity', 1)
        label.attr('opacity', 0)
      })

    // Find shared namespaces (used by multiple standards)
    const namespaceUsage = {}
    standards.forEach((standard) => {
      standard.namespaces.forEach((ns) => {
        if (!namespaceUsage[ns.uri]) {
          namespaceUsage[ns.uri] = []
        }
        namespaceUsage[ns.uri].push(standard.title)
      })
    })

    // Highlight shared namespaces (used by multiple standards)
    nodeGroup
      .filter(
        (d) =>
          d.group === 'namespace' &&
          namespaceUsage[d.id] &&
          namespaceUsage[d.id].length > 1,
      )
      .select('.node-circle')
      .attr('stroke-width', 2.5)

    // Ensure initial size is correct after graph is created
    updateVisualizationSize()
  } catch (error) {
    console.error('Error creating visualization:', error)
  }
})

// Clean up event listeners when component is destroyed
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.knowledge-graph {
  width: 100%;
  height: 80vh; /* Use viewport height instead of rem for better responsiveness */
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.knowledge-graph svg {
  width: 100%;
  height: 100%;
  display: block;
}

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

circle {
  cursor: pointer;
}

.hover-area {
  pointer-events: all;
  cursor: pointer;
}

.labels text {
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
}

/* Layer organization for proper stacking */
.link-layer {
  z-index: 1;
}

.node-layer {
  z-index: 2;
}

.label-layer {
  z-index: 3;
}
</style>
