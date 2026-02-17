import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const RECIPIENT_EMAIL = 'hjakewilliams@gmail.com'
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification to website owner
    if (GMAIL_USER && GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_APP_PASSWORD,
          },
        })

        await transporter.sendMail({
          from: GMAIL_USER,
          to: RECIPIENT_EMAIL,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          `,
        })

        console.log(`Email sent to ${RECIPIENT_EMAIL} for submission from ${name}`)
      } catch (err) {
        console.error('Error sending email:', err)
      }
    }

    // Add subscriber to MailerLite
    if (MAILERLITE_API_KEY) {
      try {
        await fetch('https://api.mailerlite.com/api/v1/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-MailerLite-Token': MAILERLITE_API_KEY,
          },
          body: JSON.stringify({
            email: email,
            name: name,
            fields: {
              portfolio_message: message,
            },
          }),
        })
      } catch (err) {
        console.error('Error adding subscriber to MailerLite:', err)
      }
    }

    // Log the contact form submission
    console.log(`Portfolio Contact Form Submission:
Name: ${name}
Email: ${email}
Message: ${message}
Time: ${new Date().toISOString()}`)

    return NextResponse.json(
      { success: true, message: 'Thank you! Your message has been received.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
