import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <img
        src="https://res.cloudinary.com/dsuxginpx/image/upload/v1686175965/static/footer-img_qhfgbe.png"
        alt=""
        className="photo"
      />
      <div className="container">
        <div className="footer_content">
          <div className="footer_content-box">
            <div className="item">
              <img src="/src/assets/image/coffee-logo.png" alt="" />
              <p className="desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
                nisi harum mollitia, officiis porro omnis dolore quia? Nostrum
                ex veritatis illo
              </p>
              <div className="rating">
                <p className="title">User Ratings</p>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} color="#53a16e" />
                  <FontAwesomeIcon icon={faStar} color="#53a16e" />
                  <FontAwesomeIcon icon={faStar} color="#53a16e" />
                  <FontAwesomeIcon icon={faStar} color="#53a16e" />
                  <FontAwesomeIcon icon={faStar} color="#53a16e" />
                </div>
                <p className="text">
                  <span>(5.0)</span> review based on 3500
                </p>
                <div className="socialnetwork">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="item">
              <p className="title">Quick Links</p>
              <span className="text">About company</span>
              <span className="text">Labella professional</span>
              <span className="text">Customer reviews</span>
              <span className="text">Modern slavery act</span>
              <span className="text">Gifts & vouchers</span>
              <span className="text">Careers</span>
              <span className="text">Careers</span>
            </div>
            <div className="item">
              <p className="title">Top Categories</p>
              <span className="text">Arabica green</span>
              <span className="text">Arabica roast</span>
              <span className="text">Robusta roast</span>
              <span className="text">Kenya beans</span>
              <span className="text">Mexican bean</span>
              <span className="text">Light roasted</span>
              <span className="text">Medium roasted</span>
            </div>
            <div className="item">
              <p className="title">My Account</p>
              <span className="text">My order</span>
              <span className="text">Track my order</span>
              <span className="text">Help center</span>
              <span className="text">Return policy</span>
              <span className="text">Terms & condition</span>
              <span className="text">Report a bug</span>
              <span className="text">Blog</span>
            </div>
            <div className="item">
              <p className="title">Useful Links</p>
              <span className="text">About us</span>
              <span className="text">Contact us</span>
              <span className="text">Faq's</span>
              <span className="text">Payment policy</span>
              <span className="text">Privacy policy</span>
              <span className="text">Shipping policy</span>
              <span className="text">Sitemap</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
