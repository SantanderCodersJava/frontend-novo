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

  document.getElementById("nome-banco").value = banco.nome;
  document.getElementById("cnpj-banco").value = banco.cnpj;
  document.getElementById("emailinstitucional").value = banco.email;
  //document.getElementById("telefone").value = banco.telefone;
  //document.getElementById("senha-banco").value = banco.senha;
  

  //DADOS CONTATO
  document.getElementById("contato").value = banco.nomeContato;
  document.getElementById("telefone-banco").value = banco.telefoneContato; 
  document.getElementById("telefonecontato").value = banco.telefoneContato;   
  document.getElementById("emailcontato").value = banco.emailContato;
  document.getElementById("cargo").value = banco.cargo;

  // DADOS DE ENDEREÇO
  document.getElementById("cep-banco").value = banco.endereco.cep;  
  document.getElementById("bairro-banco").value = banco.endereco.bairro; 
  document.getElementById("rua-banco").value = banco.endereco.rua;  
  document.getElementById("numero-banco").value = banco.endereco.numero;      
  document.getElementById("complemento-banco").value = banco.endereco.complemento;
  document.getElementById("cidade-banco").value = banco.endereco.cidade;
  document.getElementById("uf-banco").value = banco.endereco.estado;   


  

}catch(err) {
  console.log(err)
}

}

