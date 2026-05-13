type ButtonProps = {
  children: React.ReactNode
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="rounded bg-green-700 px-4 py-2 text-white">
      {children}
    </button>
  )
}