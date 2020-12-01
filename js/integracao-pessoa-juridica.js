document.getElementById("defaultOpen").click();

document.getElementById("cadastroEmpresa").onsubmit = async function( event ){

    event.preventDefault();

    // PEGA OS VALORES QUE O USUARIO DIGITOU NO CADASTRO DA EMPRESA
    const razaoSocial = document.getElementById("razao-social").value;
    const cnpjEmpresa = document.getElementById("cnpj-empresa").value;
    const ieEmpresa = document.getElementById("ie-empresa").value;
    const fundacaoEmpresa = document.getElementById("fundacao-empresa").value;
    const emailEmpresa = document.getElementById("email-empresa").value;
    const contatoEmpresa = document.getElementById("contato-empresa").value;
    const emailContatoEmpresa = document.getElementById("emailContatoEmpresa").value;
    const telefoneContatoEmpresa = document.getElementById("telefoneContatoEmpresa").value;
    const cargoEmpresa = document.getElementById("cargoEmpresa").value;

    //ENDEREÇO
    const ruaEmpresa = document.getElementById("rua-empresa").value;
    const numeroEmpresa = document.getElementById("numero-empresa").value;
    const complementoEmpresa = document.getElementById("complemento-empresa").value;
    const bairroEmpresa = document.getElementById("bairro-empresa").value;
    const cidadeEmpresa = document.getElementById("cidade-empresa").value;
    const estadoEmpresa = document.getElementById("uf-doador").value;
    const cepEmpresa = document.getElementById("cep-empresa").value;  


    const porteQtd = document.getElementsByName("qtd_Colaboradores");

    let qtdColaboradores = 0;

    for(let i = 0; i < porteQtd.length; i++){
        if(porteQtd[i].checked) {
            qtdColaboradores = porteQtd[i].value;
        }
    }

    
    // OBJETO QUE EU ENVIO NO POST DA REQUISIÇÃO

    const endereco =  {
        rua : ruaEmpresa,
        numero : numeroEmpresa, 
        complemento : complementoEmpresa, 
        bairro : bairroEmpresa,
        cidade : cidadeEmpresa,
        estado : estadoEmpresa,
        cep : cepEmpresa,
        latitude : null,
        longitude : null,
        empresa : { 
            razaoSocial : razaoSocial,
            emailEmpresa : emailEmpresa,
            cnpjEmpresa : cnpjEmpresa,
            telefone1 : telefoneContatoEmpresa,
            cargoEmpresa : cargoEmpresa,
            dataFundacao : fundacaoEmpresa,
            inscricaoEstadual : ieEmpresa,
            nomeContato : contatoEmpresa,
            emailContato : emailContatoEmpresa,
            quantidadeColaboradores : qtdColaboradores
        }
    }

    const api = axios.create({
        baseURL: "http://localhost:8080",
    })
    


    // FAÇO A REQUISIÇÃO
    api.post("/enderecos", endereco)
    .then(res => {
        alert("Empresa cadastrada com sucesso!")
    })
    .catch(err => {
        alert("Erro ao cadastrar");
    })

}