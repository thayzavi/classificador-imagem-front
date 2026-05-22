interface Props {
  params: {
    id: string
  }
}

export default function AnalysisDetailsPage({
  params,
}: Props) {
  return (
    <div>
      <h1>Detalhes {params.id}</h1>
    </div>
  )
}