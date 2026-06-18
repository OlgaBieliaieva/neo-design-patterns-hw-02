import { ILogger, INotificationChannel } from "../core/interfaces";
import { User } from "../models/User";

/**
 * Сервіс Push-повідомлень.
 *
 * SRP:
 * відповідає лише за Push-відправку.
 */
export class PushNotification implements INotificationChannel {
  constructor(private logger: ILogger) {}

  send(user: User, message: string): void {
    this.logger.log(
      `Sending PUSH to ${user.deviceToken}`
    );

    console.log(
      `Push sent to ${user.deviceToken}: ${message}`
    );
  }
}
