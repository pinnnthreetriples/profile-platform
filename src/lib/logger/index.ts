/**
 * Centralized logging utility
 *
 * Provides structured logging with environment-aware behavior:
 * - Development: Full console output with colors
 * - Production: Structured JSON logs
 * - Test: Silent by default
 */

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment: boolean
  private isTest: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development"
    this.isTest = process.env.NODE_ENV === "test"
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()

    if (this.isDevelopment) {
      const emoji = {
        debug: "🔍",
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
      }[level]

      const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : ""
      return `${emoji} [${timestamp}] ${message}${contextStr}`
    }

    // Production: structured JSON
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...context,
    })
  }

  debug(message: string, context?: LogContext): void {
    if (this.isTest) return
    console.debug(this.formatMessage("debug", message, context))
  }

  info(message: string, context?: LogContext): void {
    if (this.isTest) return
    console.info(this.formatMessage("info", message, context))
  }

  warn(message: string, context?: LogContext): void {
    if (this.isTest) return
    console.warn(this.formatMessage("warn", message, context))
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.isTest) return

    const errorContext = {
      ...context,
      ...(error instanceof Error
        ? {
            error: {
              name: error.name,
              message: error.message,
              stack: error.stack,
            },
          }
        : { error }),
    }

    console.error(this.formatMessage("error", message, errorContext))
  }
}

// Singleton instance
export const logger = new Logger()
