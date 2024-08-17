# Notification Service

This is a notification service built with Node.js and Express. It provides several API endpoints for sending notifications, handling bounces, handling spam reports, and handling unsubscribe requests.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/zpratikpathak/Email-Notification.git
    ```

2. Install the dependencies:

    ```bash
    cd notification-service
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    PORT=port-number
    PRIMARY_SMTP_HOST=your-primary-smtp-host
    PRIMARY_SMTP_PORT=your-primary-smtp-port
    PRIMARY_SMTP_USER=your-primary-smtp-user
    PRIMARY_SMTP_PASS=your-primary-smtp-password
    BACKUP_SMTP_HOST=your-backup-smtp-host
    BACKUP_SMTP_PORT=your-backup-smtp-port
    BACKUP_SMTP_USER=your-backup-smtp-user
    BACKUP_SMTP_PASS=your-backup-smtp-password
    ```

4. Start the server:

    ```bash
    npm start
    ```

## API Endpoints

### Send Notification

Send a notification email.

- **URL:** `/send-notification`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
     "from": "sender@example.com",
     "email": "recipient@example.com",
     "subject": "Notification Subject",
     "text": "Notification Text"
  }
  ```

- **Response:**

  - Success:

     ```json
     {
        "message": "Notification sent successfully"
     }
     ```

  - Error:

     ```json
     {
        "error": "Failed to send notification"
     }
     ```

### Handle Bounce

Handle a bounce notification.

- **URL:** `/handle-bounce`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
     "email": "bounced-email@example.com"
  }
  ```

- **Response:**

  - Success:

     ```json
     {
        "message": "Bounce handled successfully"
     }
     ```

  - Error:

     ```json
     {
        "error": "Missing email field"
     }
     ```

### Handle Spam

Handle a spam report.

- **URL:** `/handle-spam`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
     "email": "spam-email@example.com"
  }
  ```

- **Response:**

  - Success:

     ```json
     {
        "message": "Spam report handled successfully"
     }
     ```

  - Error:

     ```json
     {
        "error": "Missing email field"
     }
     ```

### Unsubscribe

Handle an unsubscribe request.

- **URL:** `/unsubscribe`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
     "email": "unsubscribe-email@example.com"
  }
  ```

- **Response:**

  - Success:

     ```json
     {
        "message": "Unsubscribe handled successfully"
     }
     ```

  - Error:

     ```json
     {
        "error": "Missing email field"
     }
     ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
