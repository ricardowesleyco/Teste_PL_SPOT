# Teste_PL_SPOT

## Instalação
Clone o repositório.

Execute 'cd .\Teste_PL_SPOT\' para acessar o diretório.

Execute 'npm install'.

Execute 'node server.js' para rodar serviço.

## Utilizando o serviço
Utilize o método "GET" nas requisições abaixo.

**Buscando músicas por cidade:**

http://localhost:8093/cidade/{nome da cidade}

> exemplo:
> 
>	http://localhost:8093/cidade/fortaleza
	
**Buscando músicas por coordenadas:**

http://localhost:8093/coordenadas/{latitude}/{longitude}

>exemplo:
>	
>    http://localhost:8093/coordenadas/-3.7304512/-38.5217989
	
**Legenda de retorno**

Status => "OK" indica sucesso na requisição

Status => "NOK" indica falha na requisição, será seguida de uma mensagem indicando a origem do erro

Musicas =>listagem de músicas de acordo com a requisição

Genero => gênero escolhido de acordo com a localidade indicada na requisição

**Observação:** Apenas cidades brasileiras serão buscadas no método de busca por cidade.
