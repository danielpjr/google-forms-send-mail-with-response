# Enviar respostas do Google Forms pelo Gmail automaticamente utilizando o Google Apps Script

<br />

<p align="center">
    <img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-forms-to-gmail.png" alt="Google Forms to Gmail" width="310">
</p>

## Começando

Este é um exemplo básico de como integrar um formulário do Google Forms com o Gmail para enviar mensagens automaicamente todas as vezes que o formulário for preenchido e enviado.

### Pré-requisitos

- Será necessário ser usuário do Gsuite (Google Workspace). Clique neste [link](https://workspace.google.com/signup/businessstarter/welcome?hl=pt-BR) para se registrar e fazer uso do trial.
- Você precisa ter um formulário criado no Google Forms. Utilize este [link](https://docs.google.com/forms/u/0/?tgif=d) se precisar criar um formulário.
- Também será necessário possuir uma conta Gmail. Utilize este [link](https://mail.google.com/mail/u/0/) para criar uma conta se for necessário.

### Mãos à obra

Acesse o seu formulário, clique no ínconde de "três pontinhos" (mais opçoes) e depois clique em "Editor de script".
<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-forms-01.png" alt="Google Forms to Gmail" width="310">

Assim que o Google Apps Script abrir em uma nova aba troque o conteúdo do arquivo Código.gs pelo javascript abaixo:
```JS
function onFormSubmit() {
  
  // Captura o Object Formulario. Não esqueça de substituir 'ID-DO-FORMULARIO' pelo valor correspondente.
  var form = FormApp.openById('ID-DO-FORMULARIO');
  
  // Obtem todas as respostas (envios) existentes para este formulário.
  var formResponses = form.getResponses();
  
  // Vamos utilizar apenas o último envio deste formulário.
  var lastResponse = formResponses.slice(-1)[0].getItemResponses();
  
  // Nome da pessoa que preencheu o formulário. Atenção! Neste exemplo o nome da pessoa é informado no primeiro campo do formulário.
  var personName = lastResponse[0].getResponse();
  
  // Nesta variável vamos montar o corpo do e-mail utilizando os campos da resposta do formulário.
  var responsesHTML = '';
  
  // Looping nos campos do formulário.
  // Atenção! Os campos que não foram preenchidos não estarão presentes nesta resposta (envio).
  for (var i = 0; i < lastResponse.length; i++) {
    var itemResponse = lastResponse[i];
    
    // Teremos o nome do campo em negrito totalmente convertido para maiúsculo e na próxima linha temos a resposta.
    responsesHTML += '<b>' + itemResponse.getItem().getTitle().toUpperCase() + "</b><br>" + itemResponse.getResponse() + "<br><br>";
  }
  
  // Aqui enviamos o conteúdo do formulário para "seu@email.com" utilizando a Gmail da conta utilizada para criar este Google Apps Script.
  MailApp.sendEmail({
    to: "seu@email.com", // Destinatário. Subistitua pelo endereço de e-mail desejado.
    subject: "Assunto do e-mail", // Assunto do e-mail
    htmlBody: responsesHTML, // Conteúdo HTML do e-mail contendo os nomes dos campos e suas respectivas respostas
    name: personName // Nome de quem preencheu o formulário.
  });
}';
```
Não esqueça de substiruir os valores "`ID-DO-FORMULARIO`", "`seu@email.com`" e "`Assunto do e-mail`", em seguida pressione Ctrl+S para salvar.

<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-apps-script-01.png" alt="Google Forms to Gmail" width="310">

Em seguida clique no menu "Editar" e depois em "Acionadores do projeto atual".

<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-apps-script-02.png" alt="Google Forms to Gmail" width="310">

Na próxima tela clique em "Adicionar acionador". Na janela modal de opções do acionador selecione "Do formuláro" para `Origem do evendo` e "Ao enviar formulário" para `Tipo de evento`. Clique em "Salvar".

<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-apps-script-03.png" alt="Google Forms to Gmail" width="310">

Provavelmente o Google vai requerer seu login para conceder as permissões de integração entre os apps da Google.

<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-apps-script-04.png" alt="Google Forms to Gmail" width="310">

Para que o Google Forms possa estar integrado ao Gmail utilizando o Google Apps Scipt você precisa conceder permissão.

<img src="https://raw.githubusercontent.com/danielpjr/google-forms-send-mail-with-response/main/images/google-apps-script-05.png" alt="Google Forms to Gmail" width="310">

### Pronto! Agora acesse e responda o se formulário para efetuar um teste. Em seguida acesse sua caixa de mensagens no Gmail.
