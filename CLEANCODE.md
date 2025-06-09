# arquivo: error-handler.ts
- muitos if/elseif dificultando a leitura,pode-se resolver problema com chave valor;

# arquivo: news-controller.ts
- comparações diretamente no if,pode-se facilitar a leitura destacando a operação para uma variavel ;
- validação do id pode ser uma função separada;

# arquivo: news-repositories

-Nome de funcões misturando idiomas sendo elas:getNoticias,getNoticiaById,createNoticia,updateNoticia,removeNoticia;

# arquivo: news-service.ts
- em getSpecificNews :a variavel news pode ser melhorada para newExist ,já que ela recebe a noticia caso exista;

- em alterNews :comparações diretamente passada para function validate "news.title !== newsData.title", pode-se facilitar a leitura destacando a operação para uma variavel ;

- em validate:Function tem mais de uma obrigação ,sendo elas:Checar se já existe noticia com titulo passado,checar tamanho do titulo e checar a se a data é valida;

- em validate:newsWithTitle é o nome de uma variavel que guarda noticia com titulo existente ,o nome pode ser melhorado para newsWithThisTitleExist;

- em validate:boolean passado direto no if "newsData.text.length < 500",pode-se facilitar a leitura destacando a operação para uma variavel ;

- em validate:magic number passado no if "500",pode-se dar semantica colocando em uma variavel ;

- em validate:boolean passado direto no if "publicationDate.getTime() < currentDate.getTime()",pode-se facilitar a leitura destacando a operação para uma variavel ;

- em validade tem um acesso direto ao banco ,sem passar pelo repositories;
# arquivo: server.ts
- magic number 300;
