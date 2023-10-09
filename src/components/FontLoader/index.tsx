'use client'

/* eslint-disable react/no-unknown-property */

import { Montserrat, Poppins } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function FontLoader() {
  return (
    <style jsx global>
      {`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
          --poppins-font: ${poppins.style.fontFamily};
        }
      `}
    </style>
  )
}
