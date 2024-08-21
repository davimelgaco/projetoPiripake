# Ambiente de Desenvolvimento Docker - Node 20

## Descrição
Este repositório é dedicado a um ambiente de desenvolvimento Docker, no qual todos os pacotes e bibliotecas necessários para o desenvolvimento com NodeJS, são instalados dentro de um container Docker. Através do mapeamento de volumes, é estabelecida uma conexão entre os arquivos do host e do container. Isso permite que todas as modificações no código, realizadas na IDE de escolha do desenvolvedor, sejam refletidas em tempo real dentro do container.   Desta forma, é possível desenvolver a aplicação no ambiente isolado do container. Existem três arquivos fundamentais para o desenvolvimento de qualquer projeto em Docker que serão descritos abaixo.

## Dockerfile
O Dockerfile é um arquivo de texto que contém uma série de instruções para a criação de uma imagem Docker. Essas instruções definem o que deve ser incluído no ambiente do container, como arquivos, variáveis de ambiente, portas a serem expostas e o que deve ser executado quando o container é iniciado.

## docker-compose.yaml
O docker-compose.yaml é um arquivo de configuração usado pelo Docker Compose, uma ferramenta que permite a definição e execução de aplicativos multi-container no Docker. Com ele, é possível criar e gerenciar ambientes complexos, compostos por vários serviços, de forma simplificada e automatizada.

O funcionamento do Docker Compose é baseado em arquivos de configuração YAML, nos quais são especificadas as características de cada serviço necessário para o funcionamento do aplicativo. Esses arquivos descrevem as dependências, portas, volumes, redes e outros detalhes que compõem a infraestrutura do ambiente.

Ao executar o comando docker-compose up, o Docker Compose lê o arquivo de configuração e cria todos os recursos necessários para o funcionamento do aplicativo, como containers, redes e volumes. Ele também gerencia a comunicação entre os serviços, facilitando a interação entre eles.

## .dockerignore
O arquivo .dockerignore é semelhante ao arquivo .gitignore usado no Git. Ele especifica quais arquivos e diretórios devem ser ignorados pelo comando docker build ao construir uma imagem Docker. Isso é útil para evitar que arquivos desnecessários ou sensíveis sejam incluídos na imagem, o que pode aumentar desnecessariamente o tamanho da imagem e potencialmente expor informações confidenciais.

## Requisitos

- SO Windows
- Docker Desktop v4.3 ou superior
- WSL + distribuição Ubuntu ou Debian
- NodeJs 20.13 LTS

## Como iniciar o projeto 
 
1º passo: Clone o repositório em sua estação de trabalho.

2º passo: Utilize o comando `npx create-react-app web` para criar um novo projeto em React em sua estação de trabalho. Em caso de projetos já existentes, apenas copie o conteúdo da pasta do ambiente de desenvolvimento para a raiz do diretório do projeto existente.

3º passo: Use o comando `docker compose up -d --build` para criar a imagem docker e iniciar o container.

4º passo (opcional): Após iniciado, utilize o comando `docker container ls -a (ou ps -a)` para verificar o status do container, caso esteja `up`, seu ambiente de desenvolvimento docker está pronto para uso, caso contrário será necessário realizar uma tratativa de erros.

5º passo (opcional): Acesse em seu navegador http://localhost para validar se o Apache está funcional.

Após a realização destes passos, será possível o iniciar seu projeto React em ambiente docker.

## Recomendações

- Modificar o `container_name`, `services` e `networks` no arquivo `docker-compose.yaml` é uma boa prática, para que o desenvolvimento do seu sistema seja personalizado de acordo com sua necessidade, e auxilia na identificação de cada container criado tanto na sua estação de trabalho quanto nos ambientes de homologação e produção.

- Use o comando `docker compose down` caso precise para todos container em execução neste projeto ou `docker container stop Nome-do-Container` caso precise parar somente um container em específico.

- Remova as imagens docker baixadas e que não estão sendo utilizadas para liberar espaço em disco da sua máquina. `docker image ls` `docker compose down` `docker image rm Nome-da-Imagem`