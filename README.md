# Notification System Refactoring (SOLID)

## Опис проєкту

Домашнє завдання до теми **«Принципи проєктування SOLID»**.

Метою роботи є проведення рефакторингу системи повідомлень відповідно до принципів SOLID та основних концепцій об'єктно-орієнтованого програмування.

Початкова реалізація містила низку архітектурних проблем:

* клас `User` одночасно зберігав дані користувача та відповідав за надсилання повідомлень;
* клас `NotificationService` містив логіку роботи всіх каналів повідомлень;
* залежності створювалися напряму через оператор `new`;
* система була складною для розширення новими каналами повідомлень.

У результаті рефакторингу система була перебудована таким чином, щоб забезпечити модульність, розширюваність та відповідність принципам SOLID.

---

## Структура проєкту

```text
src/
├── core/
│   └── interfaces.ts
├── models/
│   └── User.ts
├── services/
│   ├── Logger.ts
│   ├── NotificationService.ts
│   ├── EmailNotification.ts
│   ├── SMSNotification.ts
│   └── PushNotification.ts
└── main.ts
```

---

## Бізнес-логіка

Система призначена для надсилання повідомлень користувачу через декілька каналів зв'язку:

* Email
* SMS
* Push Notification

Користувач містить контактні дані для всіх доступних каналів:

* електронну пошту;
* номер телефону;
* токен мобільного пристрою.

Кожен канал повідомлень реалізований як окремий сервіс та самостійно відповідає за процес надсилання повідомлення.

Центральний сервіс `NotificationService` не залежить від конкретних реалізацій каналів і працює лише через спільний інтерфейс.

---

## Реалізація принципів SOLID

### Single Responsibility Principle (SRP)

Кожен клас має лише одну відповідальність:

| Клас                | Відповідальність                           |
| ------------------- | ------------------------------------------ |
| User                | Зберігання даних користувача               |
| Logger              | Логування подій                            |
| EmailNotification   | Надсилання Email                           |
| SMSNotification     | Надсилання SMS                             |
| PushNotification    | Надсилання Push-повідомлень                |
| NotificationService | Координація процесу надсилання повідомлень |

---

### Open/Closed Principle (OCP)

Система відкрита для розширення та закрита для модифікації.

Для додавання нового каналу повідомлень достатньо створити новий клас, який реалізує інтерфейс `INotificationChannel`.

Наприклад:

```typescript
export class TelegramNotification
  implements INotificationChannel {

  send(user: User, message: string): void {
    console.log(message);
  }

}
```

Існуючі класи змінювати не потрібно.

---

### Liskov Substitution Principle (LSP)

Усі канали повідомлень реалізують спільний інтерфейс:

```typescript
INotificationChannel
```

Будь-який канал може бути використаний замість іншого без зміни логіки системи.

---

### Interface Segregation Principle (ISP)

Інтерфейс каналу повідомлень містить лише один метод:

```typescript
send(user: User, message: string): void;
```

Реалізації не залежать від непотрібних їм методів.

---

### Dependency Inversion Principle (DIP)

Усі залежності будуються через абстракції:

```typescript
ILogger
INotificationChannel
INotificationService
```

Наприклад, класи каналів повідомлень отримують логер через конструктор:

```typescript
constructor(private logger: ILogger) {}
```

Завдяки цьому конкретні реалізації можна легко замінювати без зміни бізнес-логіки.

---

## Використані принципи ООП

### Інкапсуляція

Внутрішній стан класів приховується за допомогою модифікатора доступу `private`.

Приклад:

```typescript
private logger: ILogger;
private channels: INotificationChannel[];
```

---

### Поліморфізм

Усі канали повідомлень працюють через єдиний інтерфейс:

```typescript
INotificationChannel
```

Тому сервіс повідомлень може взаємодіяти з ними однаковим способом:

```typescript
channel.send(user, message);
```

---

### Асоціація

Канали повідомлень використовують логер через інтерфейс `ILogger`.

```typescript
constructor(private logger: ILogger)
```

---

### Агрегація

Клас `NotificationService` містить колекцію каналів повідомлень:

```typescript
private channels: INotificationChannel[] = [];
```

Канали можуть існувати незалежно від сервісу повідомлень та передаються до нього через метод:

```typescript
addChannel(channel);
```

---

## Демонстрація роботи

У файлі `main.ts` створюються:

1. Користувач.
2. Логер.
3. Канали повідомлень.
4. Сервіс повідомлень.

Далі канали додаються до сервісу:

```typescript
notificationService.addChannel(emailChannel);
notificationService.addChannel(smsChannel);
notificationService.addChannel(pushChannel);
```

Після цього виконується надсилання повідомлення:

```typescript
notificationService.notify(
  user,
  "Ваш платіж оброблено успішно!"
);
```

---

## Інструкція з запуску

### Встановлення залежностей

```bash
npm install
```

### Компіляція TypeScript

```bash
npx tsc
```

або

```bash
npm run build
```

### Запуск програми

```bash
node dist/main.js
```

---

## Очікуваний результат

```text
[LOG]: Sending EMAIL to example@email.com
Email sent to example@email.com: Ваш платіж оброблено успішно!

[LOG]: Sending SMS to +380123456789
SMS sent to +380123456789: Ваш платіж оброблено успішно!

[LOG]: Sending PUSH to device-token-abc
Push sent to device-token-abc: Ваш платіж оброблено успішно!
```

---

## Висновок

У ході виконання роботи було проведено рефакторинг системи повідомлень відповідно до принципів SOLID. Архітектура стала більш модульною, розширюваною та придатною для подальшого розвитку. Додавання нових каналів повідомлень не потребує зміни існуючого коду, а використання інтерфейсів дозволяє зменшити зв'язність між компонентами системи та спростити їх підтримку.
