import React from 'react'
import Link from 'next/link'
const ToggleNav = () => {
  return (
    <>

          <div className="topbar">
        <div className="second-nav">
          <nav className="scrollmenu">
            <Link className="category-btn" value="" href="/">
             
              <li>Home</li>
            </Link>
            <Link className="category-btn" value="Hardware" href={{
              pathname: '/category/Hardware',
              query: { name: 'Hardware' },
            }}>
              
              <li>Hardware</li>
            </Link>
            <Link className="category-btn" value="Gaming" href={{
              pathname: '/category/Gaming',
              query: { name: 'Gaming' },
            }}>
              <li>Gaming</li>
            </Link>
            <Link className="category-btn" value="Mobile" href={{
              pathname: '/category/Mobile',
              query: { name: 'Mobile' },
            }}>
              <li>Mobile</li>
            </Link>
            <Link className="category-btn" value="Software" href={{
              pathname: '/category/Software',
              query: { name: 'Software' },
            }}>
              <li>Software</li>
            </Link>
            <Link className="category-btn" value="Deals" href={{
              pathname: '/category/Deals',
              query: { name: 'Deals' },
            }}>
              <li>Deals</li>
            </Link>
            <Link className="category-btn" value="Reviews" href={{
              pathname: '/category/Reviews',
              query: { name: 'Reviews' },
            }}>
              <li>Reviews</li>
            </Link>
          </nav>
        </div>
      </div>
    
    </>
  )
}

export default ToggleNav