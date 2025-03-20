import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test")({
  component: Test
})

function Test() {
  return (
    <div className="flex grow items-center justify-center">
      <h1 className="font-bold text-2xl">Hello World</h1>
    </div>
  )
}
