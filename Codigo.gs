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
}
