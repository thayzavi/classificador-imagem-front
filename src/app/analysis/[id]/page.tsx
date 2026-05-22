interface Props {
  params: {
    id: string
  }
}

export default function AnalysisPage({ params }: Props) {
  return (
    <div>
      <h1>Análise {params.id}</h1>
    </div>
  )
}