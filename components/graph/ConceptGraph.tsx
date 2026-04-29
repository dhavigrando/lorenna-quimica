'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { GraphData } from '@/lib/types'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

const MATERIA_COLORS: Record<string, string> = {
  'quimica-geral':        '#F26D90',
  'fisico-quimica':       '#E879F9',
  'quimica-organica':     '#FB7185',
  'fenomenos-transporte': '#38BDF8',
  'balanco-massa-energia':'#FBBF24',
  'termodinamica':        '#FB923C',
  'cinetica-reatores':    '#A78BFA',
  'laboratorio':          '#34D399',
}

export function ConceptGraph({ initialData }: { initialData: GraphData }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)

  const handleClick = useCallback((node: { id?: string | number }) => {
    if (node.id) router.push(`/conceito/${node.id}`)
  }, [router])

  const nodeCanvasObject = useCallback((
    node: { id?: string | number; label?: string; materiaSlug?: string; val?: number; x?: number; y?: number },
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => {
    const label = (node.label as string) || String(node.id)
    const r     = Math.sqrt((node.val ?? 1) + 2) * 3
    const color = MATERIA_COLORS[(node.materiaSlug as string) ?? ''] ?? '#F26D90'

    // circle
    ctx.beginPath()
    ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI)
    ctx.fillStyle = color + '33'
    ctx.fill()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.2
    ctx.stroke()

    // label
    if (globalScale >= 1.2) {
      const fontSize = Math.max(3, 10 / globalScale)
      ctx.font = `${fontSize}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#3D2A33'
      ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + r + fontSize * 0.8)
    }
  }, [])

  return (
    <ForceGraph2D
      graphData={data}
      nodeId="id"
      nodeLabel="label"
      nodeCanvasObject={nodeCanvasObject}
      nodeCanvasObjectMode={() => 'replace'}
      onNodeClick={handleClick}
      linkColor={() => '#FFCAD9'}
      linkWidth={1}
      backgroundColor="#FFFBF7"
      enableNodeDrag
      enableZoomInteraction
      cooldownTicks={80}
      d3AlphaDecay={0.02}
      d3VelocityDecay={0.3}
    />
  )
}
