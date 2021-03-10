import React , {Fragment,useEffect,useState} from "react";

import Swal from 'sweetalert2';
import axios from 'axios';

// react-bootstrap components
import {
  
  Button,
  Card,
  Form,  
  Container,
  Row,
  Col,
  Table, 
  
} from "react-bootstrap";


function Pago() {  

    const API = 'http://127.0.0.1:8000/api/';
    const [cliente,setCliente] = React.useState([]); 
    
    const [datos,setDatos] = useState({
        billetera_id:'',
        documento:'',
        cell:'',
        monto:'',
        nombres:'',   
        codigo:''
     });  

     useEffect( () =>{
        obtenerDatos();
       },[])
    
       const obtenerDatos =  async () =>{
         const data = await fetch(API+'cliente');
         const _clientes = await data.json();
         setCliente(_clientes);
       }

       const seleccionar = (e) =>{   
        return () => {
         setDatos({
           billetera_id:e.id,
           documento:'',
           cell:'',
           monto:'',
           nombres:e.nombres,
           codigo:''   
         });      
        }
      }

      const onCambio = (e) =>{  
        setDatos({
          ...datos,
          [e.target.name]:e.target.value
        });    
      }

      const enviarDatos = (e) =>{    
        e.preventDefault();    
        // if(datos.documento == ''){
        //   Swal.fire(
        //     'Debe llenar el campo Documento',
        //     'Presione el boton para continuar',
        //     'error'
        //   )
        //   return false;
        // }
        // if(datos.cell == ''){
        //   Swal.fire(
        //     'Debe llenar el campo Cel',
        //     'Presione el boton para continuar',
        //     'error'
        //   )
        //   return false;
        // }
        if(datos.monto == ''){
          Swal.fire(
            'Debe llenar el campo monto',
            'Presione el boton para continuar',
            'error'
          )
          return false;
        }
        if(datos.codigo == ''){
          Swal.fire(
            'Debe llenar el campo codigo',
            'Presione el boton para continuar',
            'error'
          )
          return false;
        }
        onPago();
      }

      const onPago = () =>{   
        return fetch(API + `procesar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
             billetera_id:datos.billetera_id,
             documento:datos.documento,
             cell:datos.cell,
             monto:datos.monto,        
             code:datos.codigo,        
            }),
          })
          .then(res => {          
            const msj =  res.json();
            msj.then((result)=>{
              if(result.code == 200){
                Swal.fire(
                  result.message,
                 'Presione el boton para continuar',
                 'success'
               )
              datos.billetera_id ='';
              datos.documento = '';
              datos.cell = '';
              datos.monto = '';
              datos.nombres = '';   
              datos.codigo = '';   
    
              document.getElementById("frmPago").reset();
    
              }
              if(result.code == 404){
                Swal.fire(
                  result.message,
                 'Presione el boton para continuar',
                 'error'
               )
              }             
            });      
            obtenerDatos();
          })
          .then(res => {
             console.log(res);
          })
      }

      const getCodigo = () =>{

        return fetch(API + `token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body:JSON.stringify({
                billetera_id:datos.billetera_id,
                documento:datos.documento,
                cell:datos.cell
               }),
        })
        .then(resp => {
            const msj =  resp.json();
            msj.then((result)=>{

                if(result.code == 200){
                   
                    Swal.fire(
                        result.message.toString(),
                       'Presione el boton para continuar',
                       'success'
                     )                    
                }

                if(result.code == 404){
                    Swal.fire(
                        result.message,
                       'Presione el boton para continuar',
                       'error'
                     )
                }
            });
        });         
         
      }



  return (
    <>
    <Container fluid>
      <Row>
        <Col className="pr-1" md="7">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>     
                <th>Nombres</th>
                <th>Email</th>
                <th>Documento</th>
                <th>Telefono</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
             
            {
              cliente.map(item =>(
                <tr key={item.id} onClick={seleccionar(item)}>
                  <td  value={item.id}>{item.nombres}</td>
                  <td  value={item.id} >{item.email}</td>
                  <td  value={item.id} >{item.documento}</td>
                  <td  value={item.id} >{item.cell}</td>
                  <td  value={item.id} >{item.balance}</td>                  
                </tr>
              ))
            }
            </tbody>
        </Table>
      </Col>
        
      <Col className="pr-1" md="5">

      <Form onSubmit={enviarDatos} id="frmPago">             

                <Row>
                  <Col md="12">
                    <h4>{datos.nombres}</h4>
                  </Col>  
                </Row>
                {/* <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Documento</label>
                      <Form.Control                       
                        placeholder="Documento"
                        name="documento"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col md="12">
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
                </Row> */}
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Monto</label>
                      <Form.Control
                        placeholder="Monto"
                        name="monto"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>                
                </Row>                
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Codigo</label>
                      <Form.Control
                        placeholder="Codigo"
                        name="codigo"
                        type="text"
                        onChange={onCambio}
                      ></Form.Control>
                    </Form.Group>
                  </Col>                
                </Row>                
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="primary"
                  onClick={enviarDatos}
                >
                  Pago
                </Button>
              <span>  </span>

              <Button
                  className="btn-fill pull-right"
                  type="button"
                  variant="primary"
                  onClick={getCodigo}
                >
                  Solicitar Codigo
                </Button>
          
        
                <div className="clearfix"></div>
              </Form>      
      
      </Col>
     </Row>
  </Container>    
  
    </> 
  );
}

export default Pago;
