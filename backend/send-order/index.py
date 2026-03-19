import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на покупку книги 'Алиса в стране чудес' на email владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    address = body.get("address", "").strip()

    if not name or not email or not address:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Заполните все поля"}),
        }

    smtp_password = os.environ["SMTP_PASSWORD"]
    sender = "vikagrebtsova@gmail.com"
    recipient = "vikagrebtsova@gmail.com"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"📚 Новый заказ — Алиса в стране чудес"
    msg["From"] = sender
    msg["To"] = recipient

    html = f"""
    <html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #6b21a8; border-bottom: 2px solid #c8962a; padding-bottom: 10px;">
        📚 Новый заказ на книгу
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px; background: #f9f9f9; font-weight: bold; width: 30%;">Имя покупателя</td>
          <td style="padding: 12px; background: #f9f9f9;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Email</td>
          <td style="padding: 12px;">{email}</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #f9f9f9; font-weight: bold;">Адрес доставки</td>
          <td style="padding: 12px; background: #f9f9f9;">{address}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Товар</td>
          <td style="padding: 12px;">Алиса в стране чудес — подарочное издание</td>
        </tr>
        <tr>
          <td style="padding: 12px; background: #6b21a8; color: white; font-weight: bold;">Сумма</td>
          <td style="padding: 12px; background: #6b21a8; color: white; font-size: 18px;">890 ₽</td>
        </tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }
