/**
 * Модель користувача.
 *
 * SRP (Single Responsibility Principle):
 * клас відповідає виключно за зберігання даних.
 *
 * Логіка надсилання повідомлень винесена
 * в окремі сервіси.
 */
export class User {
  constructor(
    public email: string,
    public phone: string,
    public deviceToken: string
  ) {}
}
