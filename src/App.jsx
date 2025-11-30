import React, { useEffect } from 'react'
import Desktop from '@/components/Desktop'
import { useThemeStore } from '@/store/useThemeStore'

function App() {
    const { isDark } = useThemeStore()

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    return (
        <Desktop />
    )
}

export default App
