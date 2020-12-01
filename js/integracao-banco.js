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

const api = axios.create({
    baseURL: "http://localhost:8080",
})

//UPLOAD DE ARQUIVOS
const fileInput = document.getElementById("imagem");

let caminhoImg;

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

document.getElementById("formulario-cadastro").onsubmit = async function( event ){

    event.preventDefault();

    // PEGA OS VALORES QUE O USUARIO DIGITOU NO CADASTRO DE BANCO DE SANGUE
    const nome = document.getElementById("nome").value;
    const cnpj = document.getElementById("cnpj").value;
    const tel = document.getElementById("telefone").value;    
    const emailinstitucional = document.getElementById("emailinstitucional").value;   
    const senha = document.getElementById("senha").value;

    // DADOS DE ENDEREÇO
    const cep = document.getElementById("cep-banco").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero-banco").value;
    const compl = document.getElementById("complemento-banco").value;  
    const bairro = document.getElementById("bairro").value;     
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("uf").value;
    /**/

    //DADOS CONTATO
    const nomeContato = document.getElementById("contato").value;
    const emailContato = document.getElementById("emailcontato").value;
    const telContato = document.getElementById("telefonecontato").value;    
    const cargo = document.getElementById("cargo").value;

    // TIPO SANGUÍNEO SELECIONADO
    // const inputTipoSangue = document.getElementsByClassName("rbpositivo");

       
    // OBJETO QUE EU ENVIO NO POST DA REQUISIÇÃO
    const endereco = {
        rua : rua,
        numero : numero, 
        complemento : compl, 
        bairro : bairro,
        cidade : cidade,
        estado : estado,
        cep : cep,
        latitude : null,
        longitude : null,
        bancoSangue : {
            nome : nome,
            email : emailinstitucional,
            cnpj : cnpj,
            telefone : tel,
            nomeContato : nomeContato,
            emailContato : emailContato,
            telefoneContato : telContato,
            cargo : cargo,
            senha : senha,
            caminhoImg : caminhoImg,
        }      
    }


    // FAÇO A REQUISIÇÃO
    api.post("/enderecos", endereco)
    .then(res => {

        // COLOCA OS TIPOS DE SANGUE SELECIONADOS EM UM ARRAY
        // for(let i = 0; i < inputTipoSangue.length; i++){

        //     if(inputTipoSangue[i].checked) {    
        //         api.post("/tiposanguineo",  {bancoSangue : res.data.bancoSangue, tipoDeSangue : inputTipoSangue[i].value, quantidadeTipo : 0})
        //         .then(res => {
                   
        //         })
        //         .catch(err => {
        //             alert("Erro na solicitação");
        //         })
        //     }
        // } 

        alert("Banco de Sangue cadastrado com sucesso!");    
    })
    .catch(err => {
        alert("Erro ao cadastrar");
    })

}