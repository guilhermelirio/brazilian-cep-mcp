# brazilian-cep-mcp

## Descrição

Este é um servidor MCP (Model Context Protocol) que fornece ferramentas para consulta de informações de Códigos de Endereçamento Postal (CEP) brasileiros. O servidor utiliza a API ViaCEP para obter dados detalhados de endereços a partir do CEP informado.

## Funcionalidades

- Consulta de endereços completos através do CEP
- Retorno de informações como logradouro, bairro, cidade, estado, região, DDD e código IBGE
- Implementação do protocolo MCP para integração com agentes de IA

## Instalação

```bash
# Clone o repositório
git clone https://github.com/guilhermelirio/brazilian-cep-mcp.git
cd brazilian-cep-mcp

# Instale as dependências
npm install
```

## Como usar

### Compilação do projeto

Para compilar o código TypeScript:

```bash
npm run build
```

### Execução do servidor

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Para iniciar o servidor após compilação:

```bash
npm start
```

### Consultando um CEP

O servidor disponibiliza a ferramenta `consultar-cep` que aceita um parâmetro:

- `cep`: Código postal no formato de 8 dígitos numéricos (obrigatório)

Exemplo de uso:

```json
{
  "cep": "01001000"
}
```

Resposta:

```
Endereço encontrado:
CEP: 01001-000
Logradouro: Praça da Sé
Complemento: lado ímpar
Bairro: Sé
Cidade: São Paulo
Estado: SP (São Paulo)
Região: Sudeste
DDD: 11
IBGE: 3550308
```

## Tecnologias utilizadas

- TypeScript
- Node.js
- Axios para requisições HTTP
- Zod para validação de esquemas
- SDK do Model Context Protocol

## Configuração Smithery

Este projeto está configurado para funcionar com a plataforma Smithery.ai, que facilita a distribuição e execução de servidores MCP.

## Estrutura do projeto

```
brazilian-cep-mcp/
├── src/
│   └── index.ts       # Código-fonte principal
├── dist/              # Código compilado
├── node_modules/      # Dependências
├── smithery.yaml      # Configuração do Smithery
├── package.json       # Configuração do projeto
├── tsconfig.json      # Configuração do TypeScript
└── README.md          # Este arquivo
```

## Autor

Guilherme Lirio Tomasi de Oliveira

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
