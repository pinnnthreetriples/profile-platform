import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PageTransition } from "./PageTransition"

describe("PageTransition", () => {
  it("should render children", () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("should wrap children in motion.main", () => {
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    const main = container.querySelector("main")
    expect(main).toBeInTheDocument()
  })

  it("should render multiple children", () => {
    render(
      <PageTransition>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </PageTransition>
    )

    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
    expect(screen.getByText("Third")).toBeInTheDocument()
  })
})
