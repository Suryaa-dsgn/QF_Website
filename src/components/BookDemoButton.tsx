'use client'

/**
 * BookDemoButton — fires the 'open-demo' custom event that DemoModal listens for.
 * Drop-in replacement for any <Link href="/demo"> or <button> throughout the site.
 * Accepts any className so it inherits btn-base, btn-primary, btn-ghost etc.
 */
export default function BookDemoButton({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const openModal = () => window.dispatchEvent(new CustomEvent('open-demo'))
  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  )
}
