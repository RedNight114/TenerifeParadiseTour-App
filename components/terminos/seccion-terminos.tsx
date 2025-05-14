interface SeccionTerminosProps {
  id: string
  titulo: string
  contenido: string
}

export function SeccionTerminos({ id, titulo, contenido }: SeccionTerminosProps) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{titulo}</h2>
      <div className="prose prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: contenido }} />
    </section>
  )
}
