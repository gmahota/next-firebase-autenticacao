import React from 'react'
import Link from 'next/link'
import WithSubnavigation from './Navbar'

function Layout({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout
