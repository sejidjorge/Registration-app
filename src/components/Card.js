import React from "react";
export default function Card(props){
    return(
        <React.Fragment><li><a className="link text-light" data-toggle="modal" href={'#modal'+props.id}>
       <strong> {props.nome} {props.sobrenome}</strong>
      </a></li><br/>
        <div className="modal fade text-dark" id={"modal"+props.id} tabindex="-1" role="dialog" aria-labelledby={props.nome+props.id} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal">Dados do cliente</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p className="p-0 m-0"><strong>Nome:</strong> {props.nome}</p><br/>
                        <p className="p-0 m-0"><strong>Sobrenome:</strong> {props.sobrenome}</p><br/>
                        <p className="p-0 m-0"><strong>E-mail:</strong> {props.email}</p><br/>
                        <p className="p-0 m-0"><strong>Telefone:</strong> {props.telefone}</p><br/>
                        <p className="p-0 m-0"><strong>CEP 1:</strong> {props.cep1}</p><br/>
                        <p className="p-0 m-0"><strong>Endereço 1:</strong> {props.endereco1} N°:{props.numero1}</p><br/>
                        <p className="p-0 m-0"><strong>CEP 2:</strong> {props.cep2}</p><br/>
                        <p className="p-0 m-0"><strong>Endereço 2:</strong> {props.endereco2} N°:{props.numero2}</p><br/>
                        <p className="p-0 m-0"><strong>Data de Nascimento:</strong> {props.nascimento}</p><br/>
                        <p className="p-0 m-0"><strong>CPF:</strong> {props.cpf}</p><br/>
                        <p className="p-0 m-0"><strong>Renda mensal:</strong> {props.renda}</p><br/>
                    </div>
                    <div class="modal-footer m-0">
                        <button type="button" class="btn btn-user-dark pr-3 pl-3 rounded-0" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div></React.Fragment>  
    );
}
