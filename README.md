# n8n-nodes-recrutei

![Recrutei Logo](./credentials/recrutei-bgblue-logo.svg)

Um nó personalizado para n8n que permite integração completa com a API do Recrutei, plataforma de recrutamento e seleção de talentos.

## 📋 Sobre

Este nó oferece uma integração completa com a API do Recrutei, permitindo automatizar processos de recrutamento e gestão de vagas diretamente no n8n. Com ele, você pode criar, gerenciar e monitorar vagas, candidatos e processos seletivos de forma automatizada.

## 🚀 Funcionalidades

### Gestão de Vagas
- **Criar Vaga**: Criação completa de vagas com todos os detalhes (título, descrição, remuneração, localização, etc.)
- **Buscar Vagas**: Consulta de vagas específicas por ID ou listagem geral
- **Atualizar Status**: Alteração do status das vagas (Publicada, Rascunho, Finalizada, Congelada)

### Gestão de Candidatos
- **Listar Candidatos**: Busca de candidatos por vagas e etapas do processo
- **Visualizar Candidatos**: Visualização detalhada de candidatos e suas aplicações

### Dados de Referência
- **Departamentos**: Lista de departamentos da empresa
- **Regimes de Trabalho**: Lista de regimes disponíveis (CLT, PJ, etc.)
- **Jobboards**: Lista de portais de vagas integrados
- **Clientes**: Lista de clientes da empresa
- **Fluxos (Pipes)**: Lista de fluxos de processo seletivo
- **Motivos de Requisição**: Lista de motivos para abertura de vagas
- **Managers**: Lista de recrutadores da empresa

### Autenticação
- **Autenticação Automática**: Login automático via credenciais configuradas

## 📦 Instalação

### Via npm (Recomendado)
```bash
npm install n8n-nodes-recrutei
```

### Via n8n Community Nodes
1. Acesse as configurações do n8n
2. Vá em "Community Nodes"
3. Adicione o pacote: `n8n-nodes-recrutei`

## ⚙️ Configuração

### 1. Credenciais da API

Para usar este nó, você precisa configurar as credenciais da API do Recrutei:

1. **Acesse sua conta Recrutei** com um usuário que tenha permissão de acesso à API
2. **Navegue até "Configurações" > "API"**
3. **Copie as chaves**:
   - `X-API-Key`: Token de identificação da empresa
   - `X-API-Secret`: Token secreto da empresa

### 2. Configuração no n8n

1. **Adicione o nó Recrutei** ao seu workflow
2. **Configure as credenciais**:
   - Selecione "Recrutei API Credentials"
   - Insira os dados de autenticação:
     - **X-API-Key**: Token de identificação da empresa
     - **X-API-Secret**: Token secreto da empresa
     - **Email**: E-mail do usuário com permissão de API
     - **Password**: Senha do usuário
3. **Teste as credenciais** usando o botão "Test" - o nó fará login automaticamente
4. **Use qualquer operação** - a autenticação é automática e transparente

## 🔧 Operações Disponíveis

### Gestão de Vagas
- **Criar Uma Vaga**: Cria nova vaga com configurações completas
- **Buscar Por Vagas**: Consulta vagas por ID ou lista todas
- **Atualizar Status Da Vaga**: Altera status da vaga (Publicada, Rascunho, Finalizada, Congelada)

### Gestão de Candidatos
- **Listando Candidatos**: Lista candidatos por vagas e etapas
- **Visualizando Candidatos**: Visualiza dados detalhados de candidatos

### Dados de Referência
- **Listando Departamentos**: Lista departamentos da empresa
- **Listando Regimes**: Lista regimes de trabalho disponíveis
- **Listando Jobboards**: Lista portais de vagas integrados
- **Listando Clientes**: Lista clientes da empresa
- **Listando Fluxos (Pipes)**: Lista fluxos de processo seletivo
- **Listando Motivos De Requisição**: Lista motivos para abertura de vagas
- **Listando Managers**: Lista recrutadores da empresa

## 📝 Exemplos de Uso

### Exemplo 1: Criar uma Vaga Completa

```json
{
  "operation": "createVacancy",
  "title": "Desenvolvedor Front-end",
  "description": "<p><h4>Responsabilidades:</h4><ul><li>Desenvolver aplicações React</li><li>Manter código limpo e documentado</li></ul></p>",
  "company_department_id": 1,
  "regime_id": 1,
  "quantity": 2,
  "workload": "40 horas",
  "pipe_id": 1,
  "remote": 1,
  "type": "Pública",
  "fixed_remuneration": 0,
  "remuneration_from": 5000,
  "remuneration_to": 7000,
  "remuneration_type": "Mês",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "skills": "React, JavaScript, HTML, CSS",
  "benefits": "Plano de Saúde, Vale Alimentação"
}
```

### Exemplo 2: Listar Candidatos de uma Vaga

```json
{
  "operation": "listCandidates",
  "vacancyIds": "123, 456",
  "pipeIds": "1, 2, 3",
  "page": 1,
  "perPage": 20
}
```

### Exemplo 3: Atualizar Status de Vaga

```json
{
  "operation": "updateVacancyStatus",
  "vacancyIdForStatus": "123",
  "status": 3
}
```

## 🔗 Recursos Úteis

- **Documentação da API Recrutei**: [https://developers.recrutei.com.br/docs/getting-started](https://developers.recrutei.com.br/docs/getting-started)
- **Documentação do n8n**: [https://docs.n8n.io](https://docs.n8n.io)
- **Repositório do Projeto**: [https://github.com/gustavoogarrido/Recrutei-node](https://github.com/gustavoogarrido/Recrutei-node)

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js >= 20.15
- npm
- n8n

### Instalação para Desenvolvimento
```bash
git clone https://github.com/gustavoogarrido/Recrutei-node.git
cd Recrutei-node
npm install
```

### Scripts Disponíveis
```bash
npm run build    # Compila o projeto
npm run dev      # Modo desenvolvimento com watch
npm run lint     # Verifica erros de linting
npm run lintfix  # Corrige erros de linting automaticamente
```

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE.md) para detalhes.

## 👨‍💻 Autor

**Gustavo Garrido**
- Email: gustavo.garrido@recrutei.com.br
- GitHub: [@gustavoogarrido](https://github.com/gustavoogarrido)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma [issue](https://github.com/gustavoogarrido/Recrutei-node/issues) no GitHub
- Entre em contato via email: gustavo.garrido@recrutei.com.br

---

**Nota**: Este é um nó da comunidade para n8n. Para suporte oficial do Recrutei, consulte a [documentação oficial da API](https://developers.recrutei.com.br/docs/getting-started).