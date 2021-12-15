import React, { useState, useEffect } from 'react';
import Menu from './menu'
import { useForm } from 'react-hook-form';
import Axios from "axios";
import InputMask from "react-input-mask";
import  validarCpf from "validar-cpf"


function useFormik({
  initialValues,
  validate
}) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    validateValues(values);
  }, [values]);

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    const { value } = event.target;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  function handleBlur(event) {
    const fieldName = event.target.getAttribute('name');
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    })
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
  };
}

function Input(){

  const formik = useFormik({
    initialValues: {
      Nome: '',
      Sobrenome: '',
      Email: '',
      Telefone: '',
      Cep1: '',
      Endereco1: '',
      Numero1: '',
      Cep2: '',
      Endereco2: '',
      Numero2: '',
      Nascimento: '',
      Cpf: '',
      Renda: '',
    },
    validate: function (values) {
      const errors = {};
    
      if(values.Nome.length === 0 ) {
        errors.Nome = 'Insira um Nome!'
      }

      if(values.Sobrenome.length === 0) {
        errors.Sobrenome = 'Insira um Sobrenome!'
      }

      if(!values.Email.includes('@')) {
        errors.Email = 'Insira um email valido!'
      }
      var tel = values.Telefone.replace(/\D/g, '')
      if(tel.length !== 11) {
        errors.Telefone = 'Insira um telefone valido!'
      }
      
      if(values.Cep1.length === 0 ) {
        errors.Cep1 = 'Insira seu Cep principal!'
      }
      
      if(values.Endereco1.length === 0 ) {
        errors.Endereco1 = 'Insira seu endereço principal!'
      }

      if(values.Numero1.length === 0 ) {
        errors.Numero1 = 'Insira o numero do seu endereço principal!'
      }

      if(values.Cep2.length === 0 ) {
        errors.Cep2 = 'Insira seu Cep secundario!'
      }
      
      if(values.Endereco2.length === 0 ) {
        errors.Endereco2 = 'Insira seu endereço secundario!'
      }

      if(values.Numero2.length === 0 ) {
        errors.Numero2 = 'Insira o numero do seu endereço secundario!'
      }

      var today = new Date().toISOString().slice(0, 10);
      var now = today.replace(/\D/g, '');
      var date = values.Nascimento.replace(/\D/g, '');
      if(date > now) {
        errors.Nascimento = 'Data de nascimento não pode ser maior que hoje!';
      }
      if(!values.Nascimento.length === 0) {
        errors.Nascimento = 'Insira sua data de nascimento!';
      }

      if(validarCpf(values.Cpf.replace(/\D/g, '')) === false ) {
        errors.Cpf = 'Insira um CPF valido!'
      }
     
      if(values.Renda.length === 0 ) {
        errors.Renda = 'Insira sua renda mensal!'
      }

      return errors;
    }
  });
  const HandleSubmit = () =>{
    Axios.post("https://new-myapp-server.herokuapp.com/register", {
      nome: formik.values.Nome,
      sobrenome: formik.values.Sobrenome,
      email: formik.values.Email,
      telefone: formik.values.Telefone,
      cep1: formik.values.Cep1,
      endereco1: formik.values.Endereco1,
      numero1: formik.values.Numero1,
      cep2: formik.values.Cep2,
      endereco2: formik.values.Endereco2,
      numero2: formik.values.Numero2,
      nascimento: formik.values.Nascimento,
      cpf: formik.values.Cpf,
      renda: formik.values.Renda,
    }).then((response) => {
     console.log(response)
    });
  }


  const { register, setValue} = useForm();
  const checkCEP1 = (e) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setValue('Endereco1', data.logradouro+", "+data.bairro+", "+data.localidade);
    });
  }
  const checkCEP2 = (e) => {
    if (!e.target.value) return;
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setValue('Endereco2', data.logradouro+", "+data.bairro+", "+data.localidade);
      console.log(setValue)
    });
  }

    return(
        <div className="bg-card-user  card-user text-light border-0 rounded-0">
              <div className="accordion" id="form-control-collapse">
                <form onSubmit={() => {
                        HandleSubmit();
                        alert('Usuario cadastrado');
                        }}
                        >
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#form-control-collapse">
                  <div className="card-body card-user p-5">
                    <div className="form-group">
                    <label htmlFor="Nome">
                    Nome:
                    </label>
                    <input
                    className="form-control input-user rounded-0" 
                    type="text"
                    placeholder="Nome"
                    name="Nome"
                    id="Nome"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Nome}
                    />
                    {formik.touched.Nome && formik.errors.Nome && <span className="formField__error alert">{formik.errors.Nome}<br/></span>}
                    <label htmlFor="Sobrenome">
                    Sobrenome:
                    </label>
                    <input
                    className="form-control input-user rounded-0" 
                    type="text"
                    placeholder="Sobrenome"
                    name="Sobrenome"
                    id="Sobrenome"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Sobrenome}
                    />
                    {formik.touched.Sobrenome && formik.errors.Sobrenome && <span className="formField__error alert">{formik.errors.Sobrenome}<br/></span>}
                    <label htmlFor="Email">
                    E-mail:
                    </label>
                    <input
                    className="form-control input-user rounded-0" 
                    type="text"
                    placeholder="email@example.com"
                    name="Email"
                    id="Email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Email}
                    />
                    {formik.touched.Email && formik.errors.Email && <span className="formField__error alert">{formik.errors.Email}<br/></span>}
                    <label htmlFor="Telefone">
                    Telefone:
                    </label>
                    <InputMask
                    className="form-control input-user rounded-0" 
                    type="text"
                    placeholder="(99) 99999-9999"
                    name="Telefone"
                    id="Telefone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Telefone}
                    mask="(99)99999-9999"
                    />
                    {formik.touched.Telefone && formik.errors.Telefone && <span className="formField__error  alert">{formik.errors.Telefone}<br/></span>}
                    <button className="btn btn-user rounded-0 collapsed mt-3 pl-3 pr-3" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Proximo</button>
                    </div>
                  </div>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#form-control-collapse">
                  <div className="card-body card-user p-5">
                    <div className="form-group">
                        <label htmlFor="Cep1">
                        Cep 1:
                        </label>
                        <InputMask
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="99999-999"
                        name="Cep1"
                        id="Cep1"
                        {...register("Cep1")}
                        onBlur={checkCEP1}           
                        onChange={formik.handleChange}
                        value={formik.values.Cep1}
                        mask="99999-999"
                        />
                        {formik.touched.Cep1 && formik.errors.Cep1 && <span className="formField__error  alert">{formik.errors.Cep1}<br/></span>}
                        <label htmlFor="Endereco1">
                        Endereço principal:
                        </label>
                        <input
                        className="form-control input-user rounded-0"  
                        type="text"
                        {...register("Endereco1" )}
                        placeholder="Endereco1"
                        id="Endereco1"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Endereco1}
                        />
                        {formik.touched.Endereco1 && formik.errors.Endereco1 && <span className="formField__error  alert">{formik.errors.Endereco1}<br/></span>}
                        <label htmlFor="Numero1">
                        Numero endereço principal:
                        </label>
                        <input
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="Numero1"
                        id="Numero1"
                        name="Numero1"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Numero1}
                        />
                        {formik.touched.Numero1 && formik.errors.Numero1 && <span className="formField__error  alert">{formik.errors.Numero1}<br/></span>}
                        <label htmlFor="Cep2">
                        Cep 2:
                        </label>
                        <InputMask
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="99999-999"
                        name="Cep2"
                        id="Cep2"
                        onBlur={checkCEP2}           
                        onChange={formik.handleChange}
                        value={formik.values.Cep2}
                        mask="99999-999"
                        />
                        {formik.touched.Cep2 && formik.errors.Cep2 && <span className="formField__error  alert">{formik.errors.Cep2}<br/></span>}
                        <label htmlFor="Endereco2">
                        Endereço secundario:
                        </label>
                        <input
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="Endereco2"
                        {...register("Endereco2" )}
                        id="Endereco2"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Endereco2}
                        />
                        {formik.touched.Endereco2 && formik.errors.Endereco2 && <span className="formField__error  alert">{formik.errors.Endereco2}<br/></span>}
                        <label htmlFor="Numero2">
                        Numero endereço secundario:
                        </label>
                        <input
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="Numero2"
                        name="Numero2"
                        id="Numero2"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Numero2}
                        />
                        {formik.touched.Numero2 && formik.errors.Numero2 && <span className="formField__error  alert">{formik.errors.Numero2}<br/></span>}
                        <button className="btn btn-user rounded-0 mt-3 pl-3 pr-3 mr-5" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Anterior</button>
                      <button className="btn btn-user rounded-0 mt-3 pl-3 pr-3 collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Proximo</button>
                    </div>
                  </div>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#form-control-collapse">
                  <div className="card-body card-user p-5">
                    <div className="form-group">
                        <label htmlFor="Nascimento">
                        Nascimento:
                        </label>
                        <input
                        className="form-control input-user rounded-0" 
                        type="date"
                        placeholder="Nascimento"
                        name="Nascimento"
                        id="Nascimento"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Nascimento}
                        />
                        {formik.touched.Nascimento && formik.errors.Nascimento && <span className="formField__error  alert">{formik.errors.Nascimento}<br/></span>}
                        <label htmlFor="Cpf">
                        CPF:
                        </label>
                        <InputMask
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="999.999.999-99"
                        name="Cpf"
                        id="Cpf"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Cpf}
                        mask="999.999.999-99"
                        />
                        {formik.touched.Cpf && formik.errors.Cpf && <span className="formField__error  alert">{formik.errors.Cpf}<br/></span>}
                        <label htmlFor="Renda">
                        Renda mensal:
                        </label>
                        <InputMask
                        className="form-control input-user rounded-0" 
                        type="text"
                        placeholder="R$: 000000,000"
                        name="Renda"
                        id="Renda"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Renda}
                        mask="R$: 999999,999"
                        />
                        {formik.touched.Renda && formik.errors.Renda && <span className="formField__error  alert">{formik.errors.Renda}<br/></span>}
                        <button className="btn btn-user rounded-0 collapsed mt-3 mr-5 pr-3 pl-3" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Anterior</button>
                      <button type="submit" className="btn btn-user rounded-0 mt-3">Salvar</button>
                    </div>
                  </div>
                </div>
              </form>
              </div>
            </div>

                    

    );
}


const Home = () =>{
    return (
        <><Menu /><Input /></>
    );
}
export default Home;