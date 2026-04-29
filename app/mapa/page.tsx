import { loadIndex, buildGraphData } from '@/lib/content'
import { MapClient } from './MapClient'

export default function MapaPage() {
  const index = loadIndex()
  const graphData = buildGraphData(index)
  return <MapClient graphData={graphData} total={index.length} />
}
