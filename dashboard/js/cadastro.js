$(document).ready(function() {
	function endereco() {
		// limpa valores do formulário de cep.
		$("input[name='rua']").val("");
		$("input[name='bairro']").val("");
		$("input[name='cidade']").val("");
		$("input[value='estado']").val("");
	}

	$("input[name=cep]").blur(function() {
		//variavel que armazena o cep sem pontos ou traços
		const cep = $(this).val().replace(/\D/g, '');

		//cerifica se campo cep possui valor informado.
		if (cep != "") {
			//validação do cep validar o CEP.
			var validacep = /^[0-9]{8}$/;
			//validação  do formato do CEP.
			if(validacep.test(cep)) {
		
				//consulta o webservice viacep.com.br/
				$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

					if (!("erro" in dados)) {
						//atualiza os campos com os valores da consulta ao webservice
						$("input[name='rua']").val(dados.logradouro);
						$("input[name='bairro']").val(dados.bairro);
						$("input[name='cidade']").val(dados.localidade);
						$("input[value='estado']").val(dados.uf);
					} 
					else {
						//CEP pesquisado não foi encontrado.
						limpa_formulário_cep();
						alert("CEP não encontrado.");
					}
				});
			} 
			else {
				//cep é inválido.
				limpa_formulário_cep();
				alert("Formato de CEP inválido.");
			}
		} 
		else {
			//cep sem valor, limpa formulário.
			limpa_formulário_cep();
		}
	});
});

function abrirForm(evt, tipoForm) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tipoForm).style.display = "block";
	evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();