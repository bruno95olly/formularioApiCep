"use strict"

const pesquisarCep = async(cep) => {

    //url da api requirida
    const url = `https://viacep.com.br/ws/${cep}/json/`

    //formato response do resultado da api buscada
    const response = await fetch (url)

    //retorna o formato json, com as informações do resultado buscado pela api
    const data = await response.json()
    return data
}

const cepValido = (cep) => /^[0-9]{8}$/.test(cep)

const limparCampos = () => {
    document.querySelector('#endereco').value = ""
    document.querySelector('#bairro').value = ""
    document.querySelector('#cidade').value = ""
    document.querySelector('#estado').value = ""
}

const preencherFormulario = async (evento) => {
    //const cep = document.querySelector('#cep').value

    //evento é um callback do eventListener, que vai retornar informações do evento estabelecido
    console.log(evento);

    //resgatando o value tirado do eventlistener
    const cep = evento.target.value

    limparCampos();

    if(cep === '') return 0;

    if(cepValido(cep)){
        //resgatando a funcao da api viacep para pegar os dados
        const infoCep = await pesquisarCep(cep)
        console.log(infoCep)

        if(infoCep.erro){
        document.querySelector('#endereco').value = 'CEP nao encontrado'

        }
        else{
            //adicionando dados da api de cep nos outros campos
            document.querySelector('#endereco').value = infoCep.logradouro
            document.querySelector('#bairro').value = infoCep.bairro
            document.querySelector('#cidade').value = infoCep.localidade
            document.querySelector('#estado').value = infoCep.uf
        }  
    }
    else{
        document.querySelector('#endereco').value = 'CEP Incorreto'
    }

}


document
    .querySelector('#cep')
    .addEventListener('focusout', preencherFormulario)

    //invocar
    //preencherFormulario()
    //preencherFormulario("ana")