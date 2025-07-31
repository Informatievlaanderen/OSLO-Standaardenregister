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
        <strong>{{ tooltip.node.id }}</strong>
        <div v-if="tooltip.node.domain">Domein: {{ tooltip.node.domain }}</div>
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

const graph = ref(null)
const { locale } = useI18n()

const tooltip = reactive<{
  visible: boolean
  x: number
  y: number
  node?: KGNode
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

    const width = 1200
    const height = 800

    const svg = d3
      .select(graph.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

    // Transform the data into nodes and links
    const nodes: KGNode[] = []
    const links: KGLink[] = []

    data.forEach((item) => {
      nodes.push({ id: item.title, group: 'title', domain: item.domain })
      nodes.push({ id: item.organization, group: 'organization' })
      links.push({
        source: item.title,
        target: item.organization,
        domain: item.domain,
      })
    })

    const uniqueNodes: KGNode[] = Array.from(
      new Set(nodes.map((node) => node.id)),
    ).map((id) => {
      return nodes.find((node) => node.id === id)!
    })

    // Create a color scale for domains
    const colorScaleDomain = d3.scaleOrdinal(d3.schemeCategory10)
    const domains = Array.from(
      new Set(data.map((item) => item.domain.replace(CODELIST_ROOT, ''))),
    )
    colorScaleDomain.domain(domains)

    // Create a color scale for domains
    const colorScaleOrg = d3.scaleOrdinal(d3.schemeSet3)
    const organizations = Array.from(
      new Set(data.map((item) => item.organization)),
    )
    colorScaleOrg.domain(organizations)
    const simulation = d3
      .forceSimulation<KGNode>(uniqueNodes)
      .force('charge', d3.forceManyBody().strength(-50)) // Stronger repulsion
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(120), // More distance between nodes
      )
      .force('center', d3.forceCenter(width / 3, height / 1.8))
      .force(
        'x',
        d3.forceX<KGNode>().x((d) => {
          // Spread by domain index
          const domainIndex = domains.indexOf(
            d.domain?.replace(CODELIST_ROOT, '') || '',
          )
          return width / 2 + (domainIndex - domains.length / 2) * 10
        }),
      )
      .force(
        'y',
        d3.forceY<KGNode>().y((d) => {
          // Optionally spread by group
          return height / 2 + (d.group === 'organization' ? 100 : -100)
        }),
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
      .attr('r', 8)
      .attr('fill', (d) => {
        if (d?.group === 'organization') {
          return colorScaleOrg(d.id)
        }
        if (d?.group === 'title') {
          return colorScaleDomain(d.domain ?? 'onbekend')
        }
        return '#cccccc'
      })
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    const labels = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(uniqueNodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', '50%')
      .attr('dy', '3%')
      .attr('text-anchor', 'middle')
      .text((d) => `${d?.id} ${d?.domain ? `- ${d.domain}` : ''}`)
      .style('visibility', 'hidden')

    node.on('mouseover', function (event, d) {
      // Get node position
      tooltip.visible = true
      tooltip.x = d.x ?? 0
      tooltip.y = d.y ?? 0
      tooltip.node = d
    })

    node.on('mouseleave', function () {
      tooltip.visible = false
      tooltip.node = undefined
    })

    node.append('title').text((d) => d?.id || '')

    // simulation
    //   .nodes(uniqueNodes)
    //   .on(
    //     'tick',
    //     ticked,
    //   )(simulation.force('link') as d3.ForceLink<KGNode, KGLink>)
    //   .links(links)

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

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('font-size', '1.6rem')
      .attr('transform', `translate(${width - 300}, 100)`)

    // Add domain legend
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Domein')
      .style('font-weight', 'bold')

    domains.forEach((domain, i) => {
      const legendRow = legend
        .append('g')
        .attr('transform', `translate(0, ${20 + i * 20})`)

      legendRow
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', colorScaleDomain(domain))

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('font-size', '1.6rem')
        .attr('dy', '0.35em')
        .text(domain)
    })

    // Add organization legend
    const orgLegend = legend
      .append('g')
      .attr('transform', `translate(0, ${20 + domains.length * 20 + 20})`)

    orgLegend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Organisaties')
      .style('font-weight', 'bold')

    organizations.forEach((org, i) => {
      const legendRow = orgLegend
        .append('g')
        .attr('transform', `translate(0, ${20 + i * 20})`)

      legendRow
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', colorScaleOrg(org))

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('dy', '0.35em')
        .text(org)
    })
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss" src="./style.scss" />
