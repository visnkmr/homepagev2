import React from "react";
// import '../../styles/globals.css'
export default function Footer() {
    return (
      <>
        <footer className="bg-slate-800  text-white" >
          <div className="grid place-items-center w-full p-20">

            <div className="text-2xl pt-8 grid md:grid-flow-col gap-y-8 gap-x-8">
            <div>
                  <a aria-aria-label="privacy policy" href="/privacy">Privacy Policy</a>
                </div>
                {/* <div>
                  <a aria-aria-label="appchoose" href="https://appchoose.blogspot.com">AppChoose</a>
                </div> */}
                <div  >
            <a
                    aria-label="youtube"
                    target="_blank"
                    rel="noreferrer"
                    href="https://youtube.com/@vishnunk"
                    
                  >
                    Youtube
                  </a>
                  </div>
                <div  >
                <a
                  aria-label="telegram"
                  target="_blank"
                  rel="noreferrer"
                  href="https://vishnunkmr.t.me/"
                  >Telegram</a>
                </div>
                <div>
                  <a
                    aria-label="linkedin"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/vishnunk-59124/"
                    
                  >
                    Linkedin
                  </a>
                </div>
                <div>
                  <a
                    aria-label="github"
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/visnkmr"
                    
                  >
                    Github
                  </a>
                </div>
                <div>
                  <a
                    aria-label="codeberg"
                    target="_blank"
                    rel="noreferrer"
                    href="https://codeberg.org/visnk"
                    
                  >
                    Codeberg
                  </a>
                </div>

            </div>

          </div>
            {/* <div className="p-10 ">
              <div className="">
                <span>
                  <p>
                    Copyright © {new Date().getFullYear()} Vishnu N K. All rights reserved.
                    {new Date().getFullYear()}
                    </p>
                </span>
              </div>
            </div> */}
        </footer>
      </>
    );
  }