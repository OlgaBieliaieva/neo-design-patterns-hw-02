import {
  INotificationChannel,
  INotificationService
} from "../core/interfaces";

import { User } from "../models/User";

/**
 * Центральний сервіс повідомлень.
 *
 * SRP:
 * відповідає лише за координацію
 * процесу надсилання повідомлень.
 *
 * OCP (Open/Closed Principle):
 * для додавання нового каналу не потрібно
 * змінювати цей клас.
 *
 * DIP:
 * залежить від абстракції INotificationChannel.
 *
 * Агрегація:
 * сервіс зберігає колекцію каналів повідомлень.
 */
export class NotificationService
  implements INotificationService {

  private channels: INotificationChannel[] = [];

  addChannel(
    channel: INotificationChannel
  ): void {
    this.channels.push(channel);
  }

  notify(
    user: User,
    message: string
  ): void {

    this.channels.forEach(channel => {
      channel.send(user, message);
    });

  }
}