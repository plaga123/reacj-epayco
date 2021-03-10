
import React, { Component } from "react";
import { Container } from "react-bootstrap";


import foto1 from "../../assets/img/Group.png"
import foto2 from "../../assets/img/Group2.png"

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="copyright">            
          ePayco © 2011 - 2019 todos los derechos reservados.
        </p> 

      <div>

        <img className="jh" src={foto1} alt="Logo" />;    
        <img src={foto2} alt="Logo" />;
        
      </div>
          
      
      </footer>
    );
  }
}

export default Footer;
