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
        <strong v-if="tooltip.node.id !== tooltip.node.domain">{{
          tooltip.node.id
        }}</strong>
        <div v-if="tooltip.node.domain">
          <strong>Domein:</strong> {{ tooltip.node.domain }}
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
  KGextendedColorScheme,
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

    // Create domain-centered structure
    const nodes: KGNode[] = []
    const links: KGLink[] = []

    // Get unique domains
    const domains = Array.from(
      new Set(data.map((item) => item.domain.replace(CODELIST_ROOT, ''))),
    )

    // Create domain nodes (central nodes)
    domains.forEach((domain) => {
      nodes.push({
        id: domain,
        group: 'domain',
        domain: domain,
      })
    })

    // Create standard nodes and link them to their domains
    data.forEach((item) => {
      const cleanDomain = item.domain.replace(CODELIST_ROOT, '')
      nodes.push({
        id: item.title,
        group: 'title',
        domain: item.domain,
      })

      // Link standard to its domain
      links.push({
        source: item.title,
        target: cleanDomain,
        domain: item.domain,
      })
    })

    // Remove duplicates
    const uniqueNodes = Array.from(
      new Map(nodes.map((node) => [node.id, node])).values(),
    )

    // Create color scales
    const colorScaleDomain = d3.scaleOrdinal(KGextendedColorScheme)
    colorScaleDomain.domain(domains)

    const simulation = d3
      .forceSimulation<KGNode & { organization?: string }>(uniqueNodes)
      .force('charge', d3.forceManyBody().strength(-50)) // Stronger repulsion
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d?.id)
          .distance(50), // Distance between standards and domains
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'x',
        d3
          .forceX<KGNode & { organization?: string }>()
          .x((d) => {
            const domainIndex = domains.indexOf(d.id)
            return width / 2 + (domainIndex - domains.length / 2) * 10
          })
          .strength(0.1),
      )
      .force(
        'y',
        d3
          .forceY<KGNode & { organization?: string }>()
          .y((d) => {
            // Keep domains in center vertically
            return height / 0.5
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
      .attr('r', (d) => (d.group === 'domain' ? 10 : 6)) // Larger domains
      .attr('fill', (d) => {
        if (d.group === 'domain') {
          return colorScaleDomain(d.id)
        } else if (d.group === 'title') {
          return colorScaleDomain(
            d.domain?.replace(CODELIST_ROOT, '') ?? 'onbekend',
          )
        }
        return '#cccccc'
      })
      .attr('stroke-width', (d) => (d.group === 'domain' ? 3 : 1))
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    // Add labels for domain nodes
    const labels = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(uniqueNodes.filter((d) => d.group === 'domain'))
      .enter()

    node.on('mouseover', function (event, d) {
      // Get node position
      tooltip.visible = true
      tooltip.x = d.x ?? 0
      tooltip.y = d.y ?? 0
      tooltip.node = d

      // Highlight connected nodes and links
      if (d.group === 'domain') {
        // Highlight all standards in this domain
        node.style('opacity', (n) =>
          n.group === 'domain' || n.domain?.replace(CODELIST_ROOT, '') === d.id
            ? 1
            : 0.3,
        )
        link.style('opacity', (l) =>
          (typeof l.target === 'string' ? l.target : l.target.id) === d.id
            ? 1
            : 0.1,
        )
      } else {
        // Highlight this standard and its domain
        const domainId = d.domain?.replace(CODELIST_ROOT, '') ?? ''
        node.style('opacity', (n) =>
          n.id === d.id || n.id === domainId ? 1 : 0.3,
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
      return `Domain: ${d.id}`
    })

    function ticked() {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y)

      node.attr('cx', (d) => d?.x ?? 0).attr('cy', (d) => d?.y ?? 10)
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
      .attr('x', -8)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Domeinen')
      .style('font-weight', 'bold')
      .style('font-size', '1.4rem')

    // Add each domain with its specific color
    domains.forEach((domain, i) => {
      const legendRow = legend
        .append('g')
        .attr('transform', `translate(0, ${25 + i * 25})`)

      legendRow
        .append('circle')
        .attr('r', 10)
        .attr('fill', colorScaleDomain(domain))
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .text(domain)
        .style('font-size', '1.5rem')

      legendRow
        .on('mouseover', (event) => {
          // Highlight corresponding nodes in the graph
          node.style('opacity', (n) =>
            (n.group === 'domain' && n.id === domain) ||
            n.domain?.replace(CODELIST_ROOT, '') === domain
              ? 1
              : 0.3,
          )
          link.style('opacity', (l) =>
            (typeof l.target === 'string' ? l.target : l.target.id) === domain
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
