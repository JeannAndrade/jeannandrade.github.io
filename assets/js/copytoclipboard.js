function loadCopyButton() {
  // get all <code> elements
  var allCodeBlocksElements = $("code");

  allCodeBlocksElements.each(function(i) {
    var currentId = "codeblock" + (i + 1);
    $(this).attr('id', currentId);

    // Envolve o <code> em um wrapper para controlar o hover
    $(this).wrap('<div class="code-wrapper"></div>');

    // Botão de copiar
    var clipButton = '<button class="btn" data-clipboard-target="#' + currentId + '">' +
                     '<img src="https://clipboardjs.com/assets/images/clippy.svg" width="13" alt="Copy to clipboard">' +
                     '</button>';

    // Insere o botão dentro do wrapper, logo após o <code>
    $(this).after(clipButton);
  });

  new ClipboardJS('.btn');
}