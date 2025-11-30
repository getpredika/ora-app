"use client"

const examples = [
  '"Bonjou! Kijan ou ye?"',
  '"Kreyòl Ayisyen se yon lang ki bèl anpil."',
  '"Nou renmen pale nan lang manman nou"',
  '"Ayiti se yon peyi ki gen yon istwa rich ak bèl."',
]

export default function ExampleButtons({
  onSelect,
}: {
  onSelect: (text: string) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {examples.map((example, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(example)}
          className="rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <span className="line-clamp-2">{example}</span>
        </button>
      ))}
    </div>
  )
}
