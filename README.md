# PT:GO Discord Bot by Quim Milho

## Índice

- [Pré-Requesitos](#pré-requesitos)
- [Como instalar](#como-instalar)
- [MySQL](#mysql)
  - Criar a database
  - Criar as tabelas
- [Configuração](#configuração)
  - Configuração da API do Discord
  - API
  - MySQL
- [Site](#site)

## Pré-requesitos

Deves ter instalado a versão `16` do `nodejs` e a versão `8` do `npm`. Também vais precisar de uma versão do `git` instalada na máquina.

## Como instalar

Para começar deves dar clone a este repositório, executando o comando `git clone https://github.com/QuimMilho/ptgo-bot-dashboard-ts`.

Após fazeres isto, deves ir à pasta `bot` e executar os comandos `npm i`, `npm run build` e em seguida `npm start`. Após isto o bot irá gerar a config file que terá de ser preenchida.

Quando acabares de a preencher basta voltares a executar `npm start`. Se a config file não for preenchida corretamente irá gerar erros futuramente!

## MySQL

### <b>Criar a database</b>

#### <b>Consola</b>

Cria uma database com o comando a baixo (O nome da database pode ser diferente).

```
CREATE DATABASE `discord`;
```

Para selecionar a database usa o comando:

```
USE `discord`;
```

#### <b>PHP My Admin</b>

Cria uma database com o nome discord.

### <b>Criar as tabelas</b>

Para criar as tabelas executa os comandos que se encontram no bloco a baixo. Estas devem ter os nomes exatamente como está escrito para evitar erros!

```sql
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clientId VARCHAR(20),
    token VARCHAR(30),
    refreshToken VARCHAR(30),
    avatar VARCHAR(35),
    tag VARCHAR(40)
);

CREATE TABLE sessions (
	`session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
	`expires` int(11) unsigned NOT NULL,
	`data` mediumtext COLLATE utf8mb4_bin,
	PRIMARY KEY (`session_id`)
);

CREATE TABLE permaRoles (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	guildId VARCHAR(20),
	clientId VARCHAR(20),
	roleId VARCHAR(20),
	timeDone DATETIME,
	expires DATETIME,
	expired BOOLEAN
);
```

### <b>Criar o Utilizador</b>

#### <b>Consola</b>

Executa os seguintes comandos na consola para criar um utilizador a atribuir as permissões que são necessárias! Deves trocar `newuser` pelo nome que queres para o utilizador e `database` pelo nome da database!

```
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT INSERT, DELETE, UPDATE, SELECT ON database.* TO 'newuser'@'localhost';
```

#### <b>PHP My Admin</b>

Pelo PHP My Admin esta configuração é muito mais fácil.

Vai a `Contas de utilizador` e clica em `Adicionar conta de utilizador`. Aqui tens de colocar um nome no utilizador, uma palavra passe e adicionar as permissões `INSERT`, `SELECT`, `UPDATE` e `DELETE`.

## Configuração

Quando se executa a aplicação pela primeira vez, um ficheiro de configuração é gerado na pasta `config`. Este deve ser editado antes de se executar uma segunda vez o bot.

```
{
	api: {
		callbackURL: 'http://localhost:3000',
		https: false,
		port: 3000,
		secret: 'string aleatoria aqui',
	},
	mysql: {
		host: '',
		database: '',
		password: '',
		user: '',
		port: 3306,
	},
	app_id: '',
	secret: '',
	token: '',
	memoryTrack: false,
}
```

### Configuração da API do discord

Para começar deves ir ao [Portal de Developers do Discord](https://discord.com/developers/applications) e criar uma aplicação. Quando criares essa aplicação, vais encontrar as seguintes informações:

`app_id` - na aba `General Information` da página da aplicação pode-se ver o `APPLICATION ID`.

`secret` - na aba `OAuth2/General` pode-se encontrar o `CLIENT SECRET`. (Informação sensível. Deve ser resetado em caso de divulgação!)

`token` - na aba `Bot` vai aparecer um botão onde está escrito `ADD BOT`. Quando clicares no botão vai-te aparecer `TOKEN` em baixo do nome do bot. (Informação sensível. Deve ser resetado em caso de divulgação!)

Na aba `Bot` tens de ativar os seguintes `INTENTS`: `PRESENCE`, `SERVER MEMBERS` e por fim, `MESSAGE CONTENT`. Nesta aba, tens também uma opção chamada `PUBLIC BOT`. Se esta opção estiver ativada, qualquer pessoa pode adicionar o bot onde quiser.

Para acabar, na aba `oAuth2/General` tens um botão chamado `ADD REDIRECT` que vai fazer aparecer em cima uma caixa de texto. Nessa caixa de texto deves colocar o url do site e acrescentar: `/api/auth/login/redirect`. (Ex. `https://ptgo.pt/api/auth/login/redirect`)

### API

Esta configuração é fácil e pode ser feita à escolha do utilizador.

`https` - queres criar uma ligação encriptada e segura entre os utilizadores e o servidor? Então seleciona `true`. Para esta funcionalidade funcionar terás de ter os devidos certificados. Podes obter os certificados juntos de uma instituição autorizada. Deves colocá-los dentro de uma pasta chamada `certs` em ficheiros de texto com os nomes `ssl.pem` e `key.pem`. Caso não queiras, selecionas `false` e não precisas de fazer mais nada!

`port` - Porta onde o servidor vai estar online!

`secret` - String aleatória para gerar os cookies (Informação sensível. Deve ser alterado em caso de divulgação!)

`callbackURL` - url da página inicial do website (ex: https://bot.ptgo.pt:8443) Como construir:

- Se tiveres `https = true` deves começar com `https://`, caso contrário deves usar `http://`
- Em seguida deves colocar o ip/dns, podendo este ser `bot.ptgo.pt`, `1.1.1.1` ou apenas `ptgo.pt`.
- Por fim, se tiveres um servidor `https` e a porta for `443` ou um servidor `http` e a porta for `80` não precisas de fazer mais nada. Caso contrário terás de adicionar `:porta` ao url.

### MySQL

`host` - ip ou dns para o servidor.

`database` - Nome da base de dados criada para o bot (onde vão estar as tabelas)

`user` - Nome do utilizador de MySQL

`password` - Password de acesso ao servidor de MySQL

`port` - Porta onde o servidor de MySQL está a correr. (Default: 3306)

## Site

Para obteres a última versão do site tens de ir pela consola à pasta `site` e executar o comando `npm run build`. Isto vai gerar uma pasta `site/build`. Tens de copiar o conteúdo dessa pasta para a pasta `bot/public` que é gerada após a primeira execução do bot!

Para copiares estando na pasta `site` pela consola podes fazer o comando `cp -r ./build/. ../bot/public/.` em linux!

## Convidar o bot

Para convidares o bot para uma guild tens de ir ao [Portal de Developers do Discord](https://discord.com/developers/applications) e escolher a aplicação do mesmo. Na aba `OAuth2/URL Generator`, tens de escolher os scopes `bot` e `application.commands` e em seguida copiar e abrir o link que vai ser gerado em baixo. Em seguida basta escolheres o servidor em que queres adicionar o bot.
