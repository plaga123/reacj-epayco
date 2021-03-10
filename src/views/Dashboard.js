import React ,{Fragment,useEffect,useState}from "react";
import Swal from 'sweetalert2';
import axios from 'axios';

// react-bootstrap components
import {  
  Button,
  Card,  
  Container,
  Row,
  Col,
  Form,
  
} from "react-bootstrap";

function Dashboard() {

  const API = 'http://127.0.0.1:8000/api/';


  const [datos,setDatos] = useState({
    nombres:'',
    email:'',
    documento:'',
    cel:''
  });

  const onCambio = (e) =>{  
    setDatos({
      ...datos,
      [e.target.name]:e.target.value
    }); 
  }

  const registar =(datos) =>{
    return fetch(API + 'registrar', {
      method: 'POST',
      headers: {          
          'Content-Type': 'application/xml',
      },
      body: ` <cliente>
                <nombres>${datos.nombres}</nombres>
                <email>${datos.email}</email>
                <documento>${datos.documento}</documento>
                <cell>${datos.cell}</cell>
              </cliente>`,
      }).then(resp => {
        
          return resp.text().then(txt => {          
            const parser = new DOMParser();
            const xmlDOM = parser.parseFromString(txt,"text/xml");
            const msj = xmlDOM.getElementsByTagName("message")[0].childNodes[0].nodeValue;
            const code = xmlDOM.getElementsByTagName("code")[0].childNodes[0].nodeValue;

            if(code == 200){              
              Swal.fire(
                msj,
                'Presione el boton para continuar',
                'success'
              )
              datos.nomre ='';
              datos.email ='';
              datos.documento ='';
              datos.cell ='';
              document.getElementById("frmCliente").reset();
            }
            if(code == 406){
              Swal.fire(
                msj,
                'Presione el boton para continuar',
                'error'
              )
            }            
          });
      },(err)=>{
        console.log(err);
      });
  }

  const enviarDatos = (e) =>{
    e.preventDefault();   

    if(datos.nombres == ''){
      Swal.fire(
        'Debe llenar el campo nombre',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }
    if(datos.email == ''){
      Swal.fire(
        'Debe llenar el campo email',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }
    if(datos.documento == ''){
      Swal.fire(
        'Debe llenar el campo documento',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }
    if(datos.cell == ''){
      Swal.fire(
        'Debe llenar el campo Cel',
        'Presione el boton para continuar',
        'error'
      )
      return false;
    }   

    registar(datos);   
    
    
  }


   




  return (
    <>
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Registrar Usuario</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={enviarDatos} id="frmCliente">
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Nombres</label>
                      <Form.Control                       
                        placeholder="Nombre"
                        name="nombres"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="6">
                    <Form.Group>
                      <label>email</label>
                      <Form.Control
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>                
                </Row>

                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>documento</label>
                      <Form.Control                       
                        placeholder="Documento"
                        name="documento"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="6">
                    <Form.Group>
                      <label>Cel</label>
                      <Form.Control
                        placeholder="Cel"
                        name="cell"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>                
                </Row>

                
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Registrar
                </Button>
              <span>  </span>
        
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>    
  </>

  );
}

export default Dashboard;
