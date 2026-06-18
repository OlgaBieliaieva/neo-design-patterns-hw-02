import { ILogger } from "../core/interfaces";

/**
 * Конкретна реалізація логера.
 *
 * Реалізує інтерфейс ILogger.
 *
 * DIP:
 * інші класи працюють через абстракцію ILogger.
 */
export class Logger implements ILogger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}
