import htmlPdf from 'html-pdf-node';
import fs from 'fs';

export async function gerarPdfAluno(aluno) {
    let fotoHtml = '-';

    if (aluno.foto) {
        const base64 = fs.readFileSync(aluno.foto).toString('base64');
        fotoHtml = `<img src="data:image/jpeg;base64,${base64}" width="120"/>`;
    }

    const html = `
    <html>
    <body>
        <h1>Relatório do Aluno</h1>

        <p>Foto: ${fotoHtml}</p>
        <p>Nome: ${aluno.nome}</p>
        <p>Email: ${aluno.email || '-'}</p>
        <p>CPF: ${aluno.cpf || '-'}</p>
        <p>Telefone: ${aluno.telefone || '-'}</p>
        <p>CEP: ${aluno.cep || '-'}</p>
        <p>Logradouro: ${aluno.logradouro || '-'}</p>
        <p>Localidade: ${aluno.localidade || '-'}</p>
        <p>UF: ${aluno.uf || '-'}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfTodos(alunos) {
    const linhas = alunos
        .map(
            (a) =>
                `<tr>
          <td>${a.nome}</td>
          <td>${a.email || '-'}</td>
          <td>${a.cpf || '-'}</td>
          <td>${a.telefone || '-'}</td>
          <td>${a.cep || '-'}</td>
          <td>${a.logradouro || '-'}</td>
          <td>${a.localidade || '-'}</td>
          <td>${a.uf || '-'}</td>
        </tr>`,
        )
        .join('');

    const html = `
  <h1 style="text-align: center;">Relatório de Alunos</h1>

  <table border="1" cellspacing="0" cellspacing="8">
    <tr>
      <th>Nome</th>
      <th>email</th>
      <th>cpf</th>
      <th>telefone</th>
      <th>cep</th>
      <th>logradouro</th>
      <th>localidade</th>
      <th>uf</th>
    </tr>
    ${linhas}
  </table>
  <p>Total: ${alunos.length} alunos</p>
`;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfTreino(treino) {
    let fotoHtml = '-';

    if (treino.foto) {
        const base64 = fs.readFileSync(treino.foto).toString('base64');
        fotoHtml = `<img src="data:image/jpeg;base64,${base64}" width="120"/>`;
    }

    const html = `
  <html>
  <body>
    <h1>Relatório do Treino</h1>

    <p>ID: ${treino.id}</p>
    <p>Foto: ${fotoHtml}</p>
    <p>Nome: ${treino.nome}</p>
    <p>Descrição: ${treino.descricao || '-'}</p>
    <p>Categoria: ${treino.categoria || '-'}</p>
    <p>Aluno ID: ${treino.alunoId || '-'}</p>
  </body>
  </html>
  `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}

export async function gerarPdfTodosTreinos(treinos) {
    const linhas = treinos
        .map(
            (t) =>
                `<tr>
      <td>${t.id}</td>
      <td>${t.nome}</td>
      <td>${t.descricao || '-'}</td>
      <td>${t.categoria || '-'}</td>
      <td>${t.foto || '-'}</td>
      <td>${t.alunoId || '-'}</td>
    </tr>`,
        )
        .join('');

    const html = `
  <h1 style="text-align: center;">Relatório de Treinos</h1>

  <table border="1" cellspacing="0" cellspacing="8">
  <tr>
    <th>id</th>
    <th>nome</th>
    <th>descricao</th>
    <th>categoria</th>
    <th>foto</th>
    <th>alunoId</th>
  </tr>
  ${linhas}
  </table>
  <p>Total: ${treinos.length} treinos</p>
`;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}
