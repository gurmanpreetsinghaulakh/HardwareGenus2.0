import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <>

<footer>
    <div className="footer">
      <div className="content-top">
        <div className="follow">
          <h5>Follow Us On</h5>
          {/* <a href=" "> <li><img src="" alt=""> Facebook</li></a> */}
          <a href="https://www.youtube.com/channel/UCYII-e3_z-lz1-R9JeI-otg">
            {" "}
            <li
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              
              }}
            >
              <img
                src="https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png"
                alt=""
                width={50}
                height={40}
              />
              YouTube
            </li>
          </a>
          {/* <a href=" "> <li><img src="" alt=""> Twitter</li></a> */}
        </div>
        <div className="topics">
      <h5>Topics</h5>
      
      <Link className="category-btn" value="" href="/">
              {" "}
              <li>Home</li>
            </Link>
            <Link className="category-btn" value="Hardware" href={{
              pathname: '/category/Hardware',
              query: { name: 'Hardware' },
            }}>
              {" "}
              <li>Hardware</li>
            </Link>
            <Link className="category-btn" value="Gaming" href="/category/Gaming">
              {" "}
              <li>Gaming</li>
            </Link>
            <Link className="category-btn" value="Mobile" href="/category/Mobile">
              {" "}
              <li>Mobile</li>
            </Link>
            <Link className="category-btn" value="Software" href="/category/Software">
              {" "}
              <li>Software</li>
            </Link>
            <Link className="category-btn" value="Deals" href="/category/Deals">
              {" "}
              <li>Deals</li>
            </Link>
            <Link className="category-btn" value="Reviews" href="/category/Review">
              {" "}
              <li>Reviews</li>
            </Link>
  </div>
        <div className="company">
      <h5>COMPANY</h5>
    
      <li><Link href="/Company/About">About</Link></li>
      <li><Link href="/Company/PrivacyPolicy/">Privacy Policy</Link></li>
        <li><Link href="/Company/Services">Services</Link></li>
        <li><Link href="/Company/TermOfUse">Term Of Use</Link></li>
        <li><Link href="/Company/Contact">Contact</Link></li>
        
    
    </div>
      </div>
      <div className="content-bottom">
        <h6>@2023 Hardware Genus INC.All rights reserved.</h6>
      </div>
      <div className="center">
        <div className="content-last">
          <h6>
            Some posts on hardwaregenus.com may contain affiliate links. We are a
            participant in the Amazon Services LLC Associates Program, an
            affiliate advertising program designed to provide a means for sites
            to earn advertising fees by advertising and linking to amazon.com
          </h6>
        </div>
      </div>
    </div>
  </footer>
   
   </>
  )
}

export default Footer