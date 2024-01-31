import React from "react";

const Footer = () => {

    return (
        <>
            <footer  >
                <div className="row">
                    <div className="col-md-3">
                        <p> <font color="#DC143C" face="Comic Sans MS">Alumno: Diego Cabot</font></p>
                    </div>
                    <div className="col-md-4 ms-auto">
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item"><a href="https://twitter.com/cabot_marcelo" target="_blank"><i className="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.facebook.com/diegomcabot" target="_blank"><i className="fab fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.linkedin.com/in/diego-cabot-8264617/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <ul className="list-inline quicklinks">
                          <li className="list-inline-item">
                          <a href="https://codeki.com.ar/" target="_blank">  <img src="\src\imagen\isologo-codeki.png"></img> </a>
                          <a href="https://nodejs.org/en" target="_blank">  <img src="\src\imagen\Node.jpg"></img> </a>
                         </li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <ul className="list-inline quicklinks">
                          <li className="list-inline-item">
                          <a href="https://github.com/diegomcabot" target="_blank"> 
                          <img src="\src\imagen\GitHub.jpg"></img>
                          </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer