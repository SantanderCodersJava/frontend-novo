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



//Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

const api = axios.create({
    baseURL: "http://localhost:8080",
})


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

document.getElementById("form-cadastro-doador").onsubmit = async function( event ){

    event.preventDefault();

    // PEGA OS VALORES QUE O USUARIO DIGITOU NO CADASTRO DE PESSOA FISICA
    const nomeDoador = document.getElementById("nome-doador").value;
    const rgDoador = document.getElementById("rg-doador").value;
    const dtNasc = document.getElementById("dt-nasc-doador").value;
    const email = document.getElementById("email-doador").value;
    const cpf = document.getElementById("cpf-doador").value;
    const telefone = document.getElementById("telefone-doador").value;
    const senha = document.getElementById("senha-doador").value;
    const ruaDoador = document.getElementById("rua-doador").value;
    const numero = document.getElementById("numero-doador").value;
    const complemento = document.getElementById("complemento-doador").value;
    const bairro = document.getElementById("bairro-doador").value;
    const cidade = document.getElementById("cidade-doador").value;
    const estado = document.getElementById("uf-doador").value;
    const cep = document.getElementById("cep-doador").value;  


    const sexo = document.getElementsByName("gender");
    let opcaoSexo = '';

    for(let i = 0; i < sexo.length; i++){
        if(sexo[i].checked) {
            opcaoSexo = sexo[i].value;
        }
    }

    const tipoSangue = document.getElementsByName("tipo_sanguineo");
    let opcaoTipoSangue = '';

    for(let i = 0; i < tipoSangue.length; i++){
        if(tipoSangue[i].checked) {
            opcaoTipoSangue = tipoSangue[i].value;
        }
    }

    //------------------
    // OBJETO QUE EU ENVIO NO POST DA REQUISIÇÃO

    const endereco =  {
        rua : ruaDoador,
        numero : numero, 
        complemento : complemento, 
        bairro : bairro,
        cidade : cidade,
        estado : estado,
        cep : cep,
        latitude : null,
        longitude : null,
        doador : {
            nome : nomeDoador,
            rg : rgDoador,
            dataNascimento : dtNasc,
            email : email,
            cpf : cpf,
            telefone : telefone,
            sexo : opcaoSexo,
            tipoSanguineo : opcaoTipoSangue,
            senha : senha,
            caminhoImg : caminhoImg,
        }
    }



    // FAÇO A REQUISIÇÃO
    api.post("/enderecos", endereco)
    .then(res => {
        alert("Doador cadastrado com sucesso!")
    })
    .catch(err => {
        alert("Erro ao cadastrar");
    })

}





