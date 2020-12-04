const api = axios.create({
  baseURL: "http://localhost:8080",
})



console.log("script carregado")

document.body.onload = async function(event) {

event.preventDefault();
 
try{

  const api = axios.create({
    baseURL: "http://localhost:8080",
  })

  const banco = await api.get(`/banco/${JSON.parse(localStorage.getItem("__login-info")).email}`)

  
  .then(res=> res.data)
    console.log(banco)

    document.getElementById("nomeBanco").innerText = banco.nome;

    // SETA A IMAGEM CADASTRADA PELO BANCO
    const imgLogo = document.getElementById("imagem")
    imgLogo.setAttribute("src", banco.caminhoImg )

  // DADOS BANCO DE SANGUE

  const nomeBanco = document.getElementById("nome-banco");
  nomeBanco.value = banco.nome;

  const cnpjBanco = document.getElementById("cnpj-banco");
  cnpjBanco.value = banco.cnpj;

  const emailInstitucional = document.getElementById("emailinstitucional");
  emailInstitucional.value = banco.email;

  //document.getElementById("telefone").value = banco.telefone;
  //document.getElementById("senha-banco").value = banco.senha;
  

  //DADOS CONTATO
  const contato = document.getElementById("contato");
  contato.value = banco.nomeContato;

  const telefoneBanco = document.getElementById("telefone-banco");
  telefoneBanco.value = banco.telefoneContato; 

  const telefoneContato = document.getElementById("telefonecontato");
  telefoneContato.value = banco.telefoneContato;   

  const emailContato = document.getElementById("emailcontato");
  emailContato.value = banco.emailContato;

  const cargo = document.getElementById("cargo")
  cargo.value = banco.cargo;

  // DADOS DE ENDEREÇO
  const cepBanco = document.getElementById("cep-banco");
  cepBanco.value = banco.endereco.cep;  

  const bairroBanco = document.getElementById("bairro-banco");
  bairroBanco.value = banco.endereco.bairro; 

  const ruaBanco = document.getElementById("rua-banco");
  ruaBanco.value = banco.endereco.rua;  

  const numeroBanco = document.getElementById("numero-banco");
  numeroBanco.value = banco.endereco.numero;      

  const complementoBanco = document.getElementById("complemento-banco");
  complementoBanco.value = banco.endereco.complemento;

  const cidadeBanco = document.getElementById("cidade-banco");
  cidadeBanco.value = banco.endereco.cidade;

  const ufBanco = document.getElementById("uf-banco");
  ufBanco.value = banco.endereco.estado;   

   // ATUALIZA OS DADOS DO BANCO
   document.getElementById("formulario-cadastro").onsubmit = (event) => {

    event.preventDefault();

    //console.log(nome.value);
    //console.log(radios[0].checked ? radios[0].value : radios[1].value)
    
    // OBJETO QUE EU ENVIO NO PUT DA REQUISIÇÃ
    
    const endereco = {
          rua : ruaBanco.value,
          numero : numeroBanco.value, 
          complemento : complementoBanco.value, 
          bairro : bairroBanco.value,
          cidade : cidadeBanco.value,
          estado : ufBanco.value,
          cep : cepBanco.value,
          latitude : null,
          longitude : null,
          bancoSangue : {
            id : banco.id,
            nome : nomeBanco.value,
            cnpj : cnpjBanco.value,
            email : emailInstitucional.value,
            telefone : telefoneBanco.value,
            nomeContato : contato.value,
            emailContato : emailContato.value,
            telefoneContato : telefoneContato.value,
            cargo : cargo.value,
            
        }        
    }
  
    console.log(endereco)
  // FAÇO A REQUISIÇÃO
  const api = axios.create({
      baseURL: "http://localhost:8080",
  })

  api.put(`/enderecos/${banco.enderecos.id}`, endereco)
  .then(res => {
      alert("Dados atualizados com sucesso!")
  })
  .catch(err => {
      console.log(err)
      alert("Erro ao alterar");
  })

}

}catch(err) {
  console.log(err)
}

}

