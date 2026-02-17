import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#c7fb41',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          color: '#000',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '-2px',
        }}
      >
        HW
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}
