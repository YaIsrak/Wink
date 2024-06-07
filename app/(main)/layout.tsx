import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className='container mx-auto px-8 min-h-screen'>
                {children}
            </main>
        </>
    )
}
