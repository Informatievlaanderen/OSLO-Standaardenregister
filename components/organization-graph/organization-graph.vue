<template>
  <div class="knowledge-graph" ref="graph" style="position: relative">
    <!-- SVG is rendered by D3 -->
    <div
      v-if="tooltip.visible && tooltip.node"
      class="graph-tooltip"
      :style="{
        left: `${tooltip.x}px`,
        top: `${tooltip.y - 40}px`, // 40px above the node
        position: 'absolute',
        zIndex: 10,
      }"
    >
      <div class="graph-tooltip__content">
        <strong v-if="tooltip.node.id !== tooltip.node.organization">{{
          tooltip.node.id
        }}</strong>
        <div v-if="tooltip.node.organization">
          <strong>Organisatie:</strong> {{ tooltip.node.organization }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="knowledgeGraph" lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import {
  Domain,
  type KGLink,
  type KGNode,
  type KGStandard,
} from '~/types/knowledge-graph'
import type { Standard } from '~/types/standard'
import { BASEPATH, CODELIST_ROOT } from '~/constants/constants'

const graph = ref<HTMLElement | null>(null)
const { locale } = useI18n()

const tooltip = reactive<{
  visible: boolean
  x: number
  y: number
  node?: KGNode & { organization?: string }
}>({
  visible: false,
  x: 0,
  y: 0,
  node: undefined,
})

onMounted(async () => {
  try {
    const [standards] = await Promise.all([
      queryContent<Standard>(BASEPATH)
        .where({
          _extension: 'json',
          _path: { $regex: `^/standaarden/.*/${locale?.value}/configuration$` },
        })
        .find(),
    ])

    // Transform the content data to KGStandard format
    const data: KGStandard[] =
      standards?.map((standard: Standard) => ({
        title: standard.title ?? 'Unknown Standard',
        theme: standard.title ?? 'Unknown Theme',
        organization:
          standard.responsibleOrganisation?.[0]?.name ?? 'Unknown Organization',
        OVO: standard.responsibleOrganisation?.[0]?.resourceReference ?? '',
        domain: standard.domain ?? Domain.ONBEKEND,
        namespaces: [],
        url: '',
      })) || []

    const width: number = graph.value?.clientWidth ?? 1200
    const height: number = graph.value?.clientHeight ?? 800

    const svg = d3
      .select(graph.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

    // Create organization-centered structure
    const nodes: (KGNode & { organization?: string })[] = []
    const links: KGLink[] = []

    // Get unique organizations
    const organizations = Array.from(
      new Set(data.map((item) => item.organization)),
    )

    // Create organization nodes (central nodes)
    organizations.forEach((organization) => {
      nodes.push({
        id: organization,
        group: 'organization',
        organization: organization,
      })
    })

    // Create standard nodes and link them to their organizations
    data.forEach((item) => {
      nodes.push({
        id: item.title,
        group: 'title',
        organization: item.organization,
      })

      // Link standard to its organization
      links.push({
        source: item.title,
        target: item.organization,
      })
    })

    // Remove duplicates
    const uniqueNodes = Array.from(
      new Map(nodes.map((node) => [node.id, node])).values(),
    )

    // Generate colors dynamically based on number of organizations
    const generateColors = (count: number) => {
      const baseColors = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf',
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#ffeaa7',
        '#dda0dd',
        '#98d8c8',
        '#f7dc6f',
        '#bb8fce',
        '#85c1e9',
      ]

      if (count <= baseColors.length) {
        return baseColors.slice(0, count)
      }

      // Generate additional colors using HSL if we need more
      const additionalColors = []
      for (let i = baseColors.length; i < count; i++) {
        const hue = (i * 137.508) % 360 // Golden angle approximation for good distribution
        const saturation = 65 + (i % 3) * 10 // Vary saturation: 65%, 75%, 85%
        const lightness = 50 + (i % 2) * 10 // Vary lightness: 50%, 60%
        additionalColors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
      }

      return [...baseColors, ...additionalColors]
    }

    const colorScaleOrganization = d3.scaleOrdinal(
      generateColors(organizations.length),
    )
    colorScaleOrganization.domain(organizations)

    const simulation = d3
      .forceSimulation<KGNode & { organization?: string }>(uniqueNodes)
      .force('charge', d3.forceManyBody().strength(-50)) // Stronger repulsion
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d?.id)
          .distance(30), // Distance between standards and organizations
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'x',
        d3
          .forceX<KGNode & { organization?: string }>()
          .x((d) => {
            const organizationIndex = organizations.indexOf(d.id)
            return (
              width / 2 + (organizationIndex - organizations.length / 2) * 10
            )
          })
          .strength(0.1),
      )
      .force(
        'y',
        d3
          .forceY<KGNode & { organization?: string }>()
          .y((d) => {
            // Keep organizations in center vertically
            return height / 2
          })
          .strength(0.1),
      )
      .on('tick', ticked)

    const link = svg
      .append('g')
      .attr('class', 'links')
      .attr('stroke', 'gray')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1.5)

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .selectAll('circle')
      .data(uniqueNodes)
      .enter()
      .append('circle')
      .attr('r', (d) => (d.group === 'organization' ? 12 : 6)) // Larger organizations
      .attr('fill', (d) => {
        if (d.group === 'organization') {
          return colorScaleOrganization(d.id)
        } else if (d.group === 'title') {
          return colorScaleOrganization(
            d.organization ?? 'Unknown Organization',
          )
        }
        return '#cccccc'
      })
      .attr('stroke-width', (d) => (d.group === 'organization' ? 3 : 1))
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    // Add labels for organization nodes
    const labels = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(uniqueNodes.filter((d) => d.group === 'organization'))
      .enter()

    node.on('mouseover', function (event, d) {
      // Get node position
      tooltip.visible = true
      tooltip.x = d.x ?? 0
      tooltip.y = d.y ?? 0
      tooltip.node = d

      // Highlight connected nodes and links
      if (d.group === 'organization') {
        // Highlight all standards from this organization
        node.style('opacity', (n) =>
          n.group === 'organization' || n.organization === d.id ? 1 : 0.3,
        )
        link.style('opacity', (l) =>
          (typeof l.target === 'string' ? l.target : l.target.id) === d.id
            ? 1
            : 0.1,
        )
      } else {
        // Highlight this standard and its organization
        node.style('opacity', (n) =>
          n.id === d.id || n.id === d.organization ? 1 : 0.3,
        )
        link.style('opacity', (l) =>
          (typeof l.source === 'string' ? l.source : l.source.id) === d.id
            ? 1
            : 0.1,
        )
      }
    })

    node.on('mouseleave', function () {
      tooltip.visible = false
      tooltip.node = undefined

      // Reset opacity
      node.style('opacity', 1)
      link.style('opacity', 1)
    })

    node.append('title').text((d) => {
      if (d.group === 'organization') {
        return `Organization: ${d.id}`
      } else {
        return `${d.id} (${d.organization || 'Unknown Org'})`
      }
    })

    function ticked() {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y)

      node.attr('cx', (d) => d?.x ?? 0).attr('cy', (d) => d?.y ?? 0)
    }

    function dragstarted(
      event: d3.D3DragEvent<SVGCircleElement, any, any>,
      d: any,
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(
      event: d3.D3DragEvent<SVGCircleElement, any, any>,
      d: any,
    ) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(
      event: d3.D3DragEvent<SVGCircleElement, any, any>,
      d: any,
    ) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('font-size', '1.2rem')
      .attr('transform', `translate(20, 20)`) // Move to top-left for better visibility

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Organisaties')
      .style('font-weight', 'bold')
      .style('font-size', '1.4rem')

    // Add each organization with its specific color
    organizations.forEach((organization, i) => {
      const legendRow = legend
        .append('g')
        .attr('transform', `translate(0, ${25 + i * 25})`)

      legendRow
        .append('circle')
        .attr('r', 8)
        .attr('fill', colorScaleOrganization(organization))
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .text(
          organization.length > 25
            ? organization.substring(0, 30) + '...'
            : organization,
        )
        .style('font-size', '1.5rem')

      legendRow
        .on('mouseover', (event) => {
          // Highlight corresponding nodes in the graph
          node.style('opacity', (n) =>
            (n.group === 'organization' && n.id === organization) ||
            n.organization === organization
              ? 1
              : 0.3,
          )
          link.style('opacity', (l) =>
            (typeof l.target === 'string' ? l.target : l.target.id) ===
            organization
              ? 1
              : 0.1,
          )
        })
        .on('mouseleave', () => {
          // Reset node and link opacity
          node.style('opacity', 1)
          link.style('opacity', 1)
        })
    })
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
