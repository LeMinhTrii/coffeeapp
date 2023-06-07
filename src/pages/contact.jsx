import React from "react";
import { styled } from "styled-components";
import { scroll } from "../assets/js/scrolltop";

const StyleContact = styled.div`
  padding-top: 130px;
  background: #222;
`;
export default function Contact() {
  scroll();
  return (
    <>
      <StyleContact />
      <main className="main">
        <section className="contact">
          <div className="container">
            <div className="contact_content">
              <div className="contact_content-heading headings">Liên Hệ</div>
              <div className="contact_content-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125411.22708408457!2d106.66639335634424!3d10.803587780005618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d02468ed31%3A0xc1b73fac8561a15d!2zSGlnaGxhbmRzIENvZmZlZSBGbG9yYSBUaOG7pyDEkOG7qWM!5e0!3m2!1svi!2s!4v1684096735615!5m2!1svi!2s"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="contact_content-sendmail">
                <div className="box">
                  <h2 className="heading">
                    Store Purchases & General <br />
                    <span>Contact Inquiries</span>
                  </h2>
                  <p className="desc">
                    La croix blog sriracha, distillery to small batch retro
                    literally coloring gochujang affogato. Edison bulb butcher
                    wayfarers pug. Raw denim try-hard, snackwave selfies
                    try-hard.
                  </p>
                </div>
                <div className="form-group">
                  <div className="line">
                    <input type="text" placeholder="Your name" />
                    <input type="text" placeholder="Your email address" />
                  </div>
                  <textarea
                    name="content"
                    cols="30"
                    rows="10"
                    placeholder="Your message here ..."
                    style={{ resize: "none" }}
                  ></textarea>
                  <button className="btncontact">Send Us</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
