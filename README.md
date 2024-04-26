## TODO
- inserir a edicao da nota
- implementar o nodemailer para envio de msg de sucesso para a caixa de email da pessoa confirmando o cadastro dela na aplicacao
- quando for listar as notas criada por determinado usuario isso apenas pode ser feito por usuario autenticado (listAllUserNotes)
- apenas um usuario autenticado pode apagar uma nota (deleteNote)

# após alterar o schema.prisma sempre rodar o 'npx prisma generate' e depois rodar a migration e para dar uma migration é só rodar o 'npx prisma migrate dev'