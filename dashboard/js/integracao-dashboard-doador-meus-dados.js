
function previewImagem(){
  var imagem = document.querySelector('input[name=imagem]').files[0];
  var preview = document.querySelector('#logo');

  var reader = new FileReader();

  reader.onloadend = function() {
      preview.src = reader.result;
  }

  if(imagem){
      reader.readAsDataURL(imagem);
  }else{
      preview.src = "../img/silhueta.png";
  }
}

//UPLOAD DE ARQUIVOS, PARA TROCAR A IMAGEM AO ATUALIZAR DOS DADOS

const fileInput = document.getElementById("imagem")

let caminhoImg
    
fileInput.addEventListener("change", async (event) => {
    const img = event.target.files[0]

    const formData = new FormData()

    formData.append("file", img)
    try{
        caminhoImg = await axios.post("http://localhost:8080/storage/upload", formData)
        .then(res => res.data)
    }catch(err) {
        console.log(err)
    }
   
})

const api = axios.create({
  baseURL: "http://localhost:8080",
})



console.log("script carregado")

document.body.onload = async function(event) {

event.preventDefault();
 
try{
  const usuario = await api.get(`/doadores/${JSON.parse(localStorage.getItem("__login-info")).email}`)

  
  .then(res=> res.data)
  console.log(usuario)
  document.getElementById("nomeDoador").innerText = usuario.nome;

  //DADOS PESSOAIS
  const nome = document.getElementById("nome-doador");
  nome.value = usuario.nome;

  const rg = document.getElementById("rg-doador");
  rg.value = usuario.rg;

  const date = document.getElementById("dt-nasc-doador");
  date.value = (new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format( new Date (usuario.dataNascimento) ));

  const email = document.getElementById("email-doador");
  email.value = usuario.email;

  const cpf = document.getElementById("cpf-doador");
  cpf.value = usuario.cpf;

  const telefone = document.getElementById("telefone-doador");
  telefone.value = usuario.telefone;
  
  //DADOS ENDEREÇO
  const rua = document.getElementById("rua-doador");
  rua.value = usuario.enderecos[0].rua;

  const numero = document.getElementById("numero-doador");
  numero.value = usuario.enderecos[0].numero;

  const complemento = document.getElementById("complemento-doador");
  complemento.value = usuario.enderecos[0].complemento;

  const bairro = document.getElementById("bairro-doador");
  bairro.value = usuario.enderecos[0].bairro;

  const cidade = document.getElementById("cidade-doador");
  cidade.value = usuario.enderecos[0].cidade;

  const uf = document.getElementById("uf-doador");
  uf.value = usuario.enderecos[0].estado;

  const cep = document.getElementById("cep-doador");
  cep.value = usuario.enderecos[0].cep;  

  //PEGANDO O TIPO SEXO E DEIXANDO O INPUT RADIO CHECKADO
  let radios = document.getElementsByName("gender")

  for(let i = 0; i < radios.length; i++) {
    if(radios[i].value === usuario.sexo) {
      radios[i].checked = true
    }
  }

  // SETA A FOTO DO DOADOR
  const imgLogo = document.getElementById("imagem")
  imgLogo.setAttribute("src", usuario.caminhoImg )

  //SETANDO A IMAGEM DE TIPO SANGUINEO ACORDO COM O TIPO DO DOADOR
  const imgTipoSangue = document.getElementById("gotaDoador");
   
  const tipoSangue = usuario.tipoSanguineo;

  switch(tipoSangue) {
    case 'APOSITIVO': 
      imgTipoSangue.setAttribute("src", '../img/Apositive.png')
      break;

    case 'ANEGATIVO':
      imgTipoSangue.setAttribute("src", '../img/Anegative.png')
      break;

    case 'BPOSITIVO':
      imgTipoSangue.setAttribute("src", '../img/Bpositive.png')
      break;

    case 'BNEGATIVO':
      imgTipoSangue.setAttribute("src", '../img/Bnegative.png')
      break;

    case 'ABPOSITIVO':
      imgTipoSangue.setAttribute("src", '../img/ABpositive.png')
      break;

    case 'ABNEGATIVO':
      imgTipoSangue.setAttribute("src", '../img/ABnegative.png')
      break;

    case 'OPOSITIVO':
      imgTipoSangue.setAttribute("src", '../img/Opositive.png')
      break;
      
    case 'ONEGATIVO':
      imgTipoSangue.setAttribute("src", '../img/Onegative.png')
      break;

    default:
      imgTipoSangue.setAttribute("src", '../img/nao-sei.png')
  }


  // ATUALIZA OS DADOS DO DOADOR
  document.getElementById("form-dados-doador").onsubmit = (event) => {

    event.preventDefault();

    console.log(nome.value);
    console.log(radios[0].checked ? radios[0].value : radios[1].value)
    // OBJETO QUE EU ENVIO NO PUT DA REQUISIÇÃ
    
    const endereco = {
          rua : rua.value,
          numero : numero.value, 
          complemento : complemento.value, 
          bairro : bairro.value,
          cidade : cidade.value,
          estado : uf.value,
          cep : cep.value,
          latitude : null,
          longitude : null,
          doador : {
            id : usuario.id,
            nome : nome.value,
            rg : rg.value,
            dataNascimento : '2020-01-01',
            email : email.value,
            cpf : cpf.value,
            telefone : telefone.value,
            sexo : radios[0].checked ? radios[0].value : radios[1].value,
            caminhoImg : caminhoImg,
            senha : usuario.senha,
            tipoSanguineo : usuario.tipoSanguineo,
            
        }        
    }
  
    console.log(endereco)
  // FAÇO A REQUISIÇÃO
  const api = axios.create({
      baseURL: "http://localhost:8080",
  })

  api.patch(`/enderecos/${usuario.enderecos[0].id}`, endereco)
  .then(res => {
      alert("Dados atualizados com sucesso!")
  })
  .catch(err => {
      alert("Erro ao alterar");
  })

}

}catch(err) {
  console.log(err)
}

}



