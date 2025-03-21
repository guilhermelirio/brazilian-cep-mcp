import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// Criando o servidor MCP
const server = new McpServer({
  name: "CEP-Server",
  version: "1.0.0",
  capabilities: {
    tools: {},
    resources: {},
    prompts: {}
  }
});


server.tool(
  "consultar-cep",
  "Query address information from a Brazilian postal code (CEP)",
  {
    cep: z.string()
      .length(8, "Postal code must have exactly 8 digits")
      .regex(/^\d+$/, "Postal code must contain only numbers")
      .describe("Postal code to be queried (only numbers, 8 digits)")
  },
  async ({ cep }) => {
    try {
      console.error(`Consulting postal code: ${cep}`);
      
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const response = await axios.get(url);
      
      // Verificando se houve erro na resposta da API
      if (response.data.erro) { 
        return {
          content: [{ 
            type: "text", 
            text: "Postal code not found in the database." 
          }],
          isError: true
        };
      }
      
      // Formatando a resposta para exibição
      const endereco = response.data;
      return {
        content: [{ 
          type: "text", 
          text: `
  Endereço encontrado:
  CEP: ${endereco.cep}
  Logradouro: ${endereco.logradouro}
  Complemento: ${endereco.complemento || "N/A"}
  Bairro: ${endereco.bairro}
  Cidade: ${endereco.localidade}
  Estado: ${endereco.uf} (${endereco.estado})
  Região: ${endereco.regiao}
  DDD: ${endereco.ddd}
  IBGE: ${endereco.ibge}
          ` 
        }]
      };
      
    } catch (erro: any) {
      console.error(`Error querying postal code: ${erro.message}`);
      
      // Verificando se o erro é devido a formato inválido (status 400)
      if (erro.response && erro.response.status === 400) {
        return {
          content: [{ 
            type: "text", 
            text: "Invalid postal code format. Use only numbers (8 digits)." 
          }],
          isError: true
        };
      }
      
      return {
        content: [{ 
          type: "text", 
          text: `Error querying postal code: ${erro.message}` 
        }],
        isError: true
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Postal Code Query Service running via stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 