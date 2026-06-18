import { User } from "../models/User";

/**
 * Інтерфейс логування.
 *
 * DIP (Dependency Inversion Principle):
 * високорівневі модулі залежать від абстракції ILogger,
 * а не від конкретного класу Logger.
 */
export interface ILogger {
  log(message: string): void;
}

/**
 * Інтерфейс каналу повідомлень.
 *
 * ISP (Interface Segregation Principle):
 * містить лише один необхідний метод.
 *
 * LSP (Liskov Substitution Principle):
 * будь-яка реалізація може бути використана
 * замість іншої реалізації цього інтерфейсу.
 */
export interface INotificationChannel {
  send(user: User, message: string): void;
}

/**
 * Інтерфейс сервісу повідомлень.
 *
 * DIP:
 * клієнт працює через абстракцію,
 * а не через конкретний NotificationService.
 */
export interface INotificationService {
  addChannel(channel: INotificationChannel): void;

  notify(user: User, message: string): void;
}
