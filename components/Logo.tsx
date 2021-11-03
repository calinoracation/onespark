import { useEffect } from 'react'

import styles from '../styles/Logo.module.css'

export function Logo() {
  useEffect(() => {
    import('@lottiefiles/lottie-player')
  }, [])

  useEffect(() => {
    if (CSS.paintWorklet) {
      CSS.paintWorklet.addModule(
        'https://cdn.jsdelivr.net/gh/calinoracation/onespark/worker.js',
      )
    }
  }, [])

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoAnimation} data-shared-element-id="logo">
        <lottie-player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/private_files/lf30_hfvmbyss.json"
        ></lottie-player>
      </div>
    </div>
  )
}
