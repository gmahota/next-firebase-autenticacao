import React from 'react'
import Link from 'next/link'

function PagesList() {
    return (
        <div>
            <Link href="/"><a>Login Page</a></Link>
            <Link href="/dashboard"><a style={{marginLeft:"10px"}}>Dashboard (Protected)</a></Link>
        </div>
    )
}

export default PagesList
