export function Loading({
  size = 40,
  thickness = 4,
}: {
  size?: number
  thickness?: number
}) {
  return (
    <div
      className="animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderStyle: "solid",
        borderColor: "var(--primary) transparent transparent transparent",
      }}
      aria-label="Loading"
    />
  )
}
