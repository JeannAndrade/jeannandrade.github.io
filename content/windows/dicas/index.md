---
layout: internal
---

# Windows

## Ajuste da hora ao iniciar a máquina

Primeira coisa a fazer é criar o arquivo ajustehorario.bat com o script abaixo e salvar numa pasta de sua preferência

```bat
net start w32time
w32tm /resync /force
net stop w32time
```

Em seguida, tecla Windows + r e digitar: `taskschd.msc`

Abrirá o agendador de tarefas do windows, siga os passos para configurar:

1. Clicar em *criar tarefa*
2. Atribuir um nome sugestivo a tarefa como "Ajuste de Hora"
3. Marcar a caixa "Executar com privilégios mais altos"
4. Na aba disparadores clicar em novo e selecionar as seguintes opções:
    - Iniciar tarefa: Ao fazer logon
    - Qualquer usuário
    - Atrasar a tarefa em: 1 minuto
    - Habilitado
5. Na aba ações clicar no botão novo e selecionar as seguintes opções:
    - Ação: Iniciar programa
    - Programa/script: selecionar o bat criado no passo inicial
    - Salvar a ação
6. Feito isso, salve a tarefa e na biblioteca do agendador, ache a tarefa recém criada e clique em executar para testar.
