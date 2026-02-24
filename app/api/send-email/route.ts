import { NextRequest, NextResponse } from 'next/server'

const RECIPIENT_EMAIL = 'hjakewilliams@gmail.com'

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

    // Send email in background (completely non-blocking)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Fire and forget - don't await, use setImmediate to ensure response is sent first
      setImmediate(async () => {
        try {
          const nodemailer = await import('nodemailer')
          const transporter = nodemailer.default.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD,
            },
            connectionTimeout: 3000,
            socketTimeout: 3000,
          })

          await transporter.sendMail({
            from: process.env.GMAIL_USER,
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

          console.log(`✅ Email sent to ${RECIPIENT_EMAIL} from ${name}`)
        } catch (err) {
          console.error('❌ Error sending email:', err)
        }
      })
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
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
