import React, { useState, useEffect } from 'react';
import Menu from './menu'
import Axios from "axios";
import Card from './Card'


function CardClient(){
    
    const [listRegistros, setListRegistros] = useState();
    useEffect(() => {
        Axios.get("https://new-myapp-server.herokuapp.com/getCards").then((response) => {
          setListRegistros(response.data)
        });
      }, []);
    
  
    return(
        <div className="bg-card-user  card-user text-light border-0 rounded-0 m-5 p-5">
              <h3 className="text-center">Clientes Cadastrados</h3>
              {typeof listRegistros !== "undefined" && listRegistros.map((value) => {
                return (
                  <Card
                    key={value.id}
                    ListCard={listRegistros}
                    setListCard={setListRegistros}
                    id={value.id}
                    nome={value.nome}
                    sobrenome={value.sobrenome}
                    email={value.email}
                    telefone={value.telefone}
                    cep1={value.cep1}
                    endereco1={value.endereco1}
                    numero1={value.numero1}
                    cep2={value.cep2}
                    endereco2={value.endereco2}
                    numero2={value.numero2}
                    nascimento={value.nascimento}
                    cpf={value.cpf}
                    renda={value.renda} />
                );
              })}
            </div>
    );
}


const Clientes = () =>{
    return (
        <><Menu /><CardClient /></>
    );
}
export default Clientes;