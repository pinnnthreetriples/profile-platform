import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock server-only package to allow testing server-only modules
vi.mock("server-only", () => ({}))
