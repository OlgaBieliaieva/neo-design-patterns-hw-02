import { User } from "./models/User";

import { Logger } from "./services/Logger";

import { EmailNotification } from "./services/EmailNotification";
import { SMSNotification } from "./services/SMSNotification";
import { PushNotification } from "./services/PushNotification";

import { NotificationService } from "./services/NotificationService";

import { INotificationService } from "./core/interfaces";

/**
 * Демонстрація роботи системи.
 *
 * Усі залежності створюються на верхньому рівні
 * та передаються через конструктори.
 *
 * Це реалізація принципу DIP.
*/

const user = new User(
  "example@email.com",
  "+380123456789",
  "device-token-abc"
);

/**
 * Створення логера.
 */
const logger = new Logger();

/**
 * Створення окремих каналів повідомлень.
 */
const emailChannel = new EmailNotification(logger);

const smsChannel = new SMSNotification(logger);

const pushChannel = new PushNotification(logger);

/**
 * Робота через абстракцію,
 * а не через конкретний клас.
 */
const notificationService: INotificationService =
  new NotificationService();

/**
 * Підключення каналів повідомлень.
 */
notificationService.addChannel(emailChannel);

notificationService.addChannel(smsChannel);

notificationService.addChannel(pushChannel);

/**
 * Надсилання повідомлення.
 */
notificationService.notify(
  user,
  "Ваш платіж оброблено успішно!"
);