# 🚀 Meu Token Básico na ZetaChain para Pitch Lucy

Este é o projeto mais simples possível para criar um token universal na ZetaChain e submetê-lo à plataforma Pitch Lucy. O token herda automaticamente capacidades cross-chain nativas.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Yarn ou npm
- Git
- Uma wallet com algumas moedas para gas fees

## 🔧 Instalação Rápida

### 1. Clone e Configure o Projeto

```bash
# Clone o repositório (ou baixe os arquivos)
git clone <seu-repo>
cd meu-token-basico-zetachain

# Instale as dependências
yarn install
# ou
npm install
```

### 2. Configure suas Chaves

```bash
# Copie o arquivo de ambiente
cp .env.example .env

# Gere uma nova wallet (se necessário)
npx hardhat account --save

# Edite o .env com sua chave privada
# PRIVATE_KEY=sua_chave_privada_aqui
```

## 🚀 Deploy Local (Recomendado para Testes)

### 1. Inicie o Localnet da ZetaChain

```bash
# Em um terminal separado, mantenha isso rodando
yarn localnet:start
```

### 2. Compile e Deploy

```bash
# Compile os contratos
yarn compile

# Deploy no localnet
yarn deploy:localnet
```

### 3. Teste o Contrato

```bash
# Execute os testes
yarn test
```

## 🌐 Deploy na Testnet

### 1. Obtenha Tokens de Teste

- Vá para o [faucet da ZetaChain](https://labs.zetachain.com/get-zeta)
- Conecte sua wallet
- Solicite tokens ZETA para a testnet

### 2. Deploy na Testnet

```bash
# Deploy na testnet da ZetaChain
yarn deploy:testnet
```

### 3. Verifique o Deploy

- Acesse [ZetaChain Athens Explorer](https://zetachain-athens.blockscout.com/)
- Cole o endereço do seu contrato para verificar

## 🎯 Enviar para Pitch Lucy

### 1. Prepare seu Token

Depois do deploy bem-sucedido, você terá:
- ✅ 1,000,000 MTB tokens em sua wallet
- ✅ Contrato verificado na blockchain
- ✅ Endereço do contrato para submissão

### 2. Acesse a Pitch Lucy

1. Vá para [pitchlucy.ai/pitch](https://pitchlucy.ai/pitch)
2. Conecte sua wallet
3. Selecione "ZetaChain" como a rede
4. Cole o endereço do seu token

### 3. Escreva seu Pitch

Exemplo de pitch convincente:

```
Lucy, apresento o MTB (Meu Token Básico) - um token construído na arquitetura Universal da ZetaChain. 

🔗 Vantagens Técnicas:
- Interoperabilidade nativa entre Bitcoin, Ethereum e BNB Chain
- Sem necessidade de pontes tradicionais ou wrapping
- Transferências cross-chain automáticas via protocolo ZetaChain

💡 Proposta de Valor:
- Simplicidade: uma interface unificada para múltiplas blockchains
- Eficiência: menores custos de transação cross-chain
- Segurança: validado pela rede ZetaChain com proof-of-stake

📊 Potencial de Mercado:
O MTB representa a próxima evolução em tokens universais, eliminando a fragmentação atual do ecossistema cripto. Com a ZetaChain conectando as maiores blockchains nativamente, o MTB oferece acesso fluido a bilhões em liquidez distribuída.

A arquitetura universal permite casos de uso inovadores como pagamentos cross-chain automáticos e gestão de portfolio multi-chain simplificada. Recomendo investimento imediato para posicionamento estratégico no ecossistema universal emergente.
```

## 📁 Estrutura do Projeto

```
meu-token-basico-zetachain/
├── MeuTokenBasico.sol      # Contrato principal
├── deploy.ts               # Script de deployment
├── test.ts                 # Testes automatizados
├── hardhat.config.ts       # Configuração do Hardhat
├── package.json            # Dependências
├── .env.example           # Variáveis de ambiente
└── README.md              # Este arquivo
```

## 🔍 Detalhes Técnicos

### O Contrato

O `MeuTokenBasico` herda de `UniversalToken` da ZetaChain, que fornece:

- ✅ Funcionalidades ERC-20 padrão
- ✅ Capacidades cross-chain automáticas
- ✅ Burn/mint em transfers entre chains
- ✅ Integração com o protocolo Gateway
- ✅ Suporte para upgrades seguros

### Redes Suportadas

- **ZetaChain**: Rede principal onde o token é nativo
- **Ethereum**: Via gateway automático
- **BNB Chain**: Via gateway automático
- **Bitcoin**: Via protocolo ZetaChain (futuro)

## 🎮 Estratégias para Pitch Lucy

### 1. Foque na Inovação Técnica
- Destaque a arquitetura universal única
- Explique o valor da interoperabilidade nativa
- Compare com soluções de ponte tradicionais

### 2. Apresente Casos de Uso Concretos
- Pagamentos internacionais simplificados
- DeFi cross-chain sem complexidade
- Gestão de portfolio unificada

### 3. Demonstre Tração do Ecossistema
- Mencione o crescimento da ZetaChain (5M+ usuários)
- Cite integrações importantes (Coinbase Onramp)
- Referencie o ZetaChain Summer '25

## 🚨 Dicas Importantes

### Segurança
- ⚠️ Nunca compartilhe sua chave privada
- ⚠️ Use apenas em testnets primeiro
- ⚠️ Faça backup de sua seed phrase

### Gas Fees
- 💰 Mantenha sempre alguns ZETA para gas
- 💰 Use aggressive gas no testnet para transações rápidas
- 💰 Monitor seus balances durante o desenvolvimento

### Troubleshooting

**Erro de instalação:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json yarn.lock
yarn install
```

**Erro de deployment:**
```bash
# Verifique se o localnet está rodando
npx zetachain@latest localnet status

# Recompile os contratos
npx hardhat compile --force
```

**Erro de gas:**
```bash
# Solicite mais tokens no faucet
# https://labs.zetachain.com/get-zeta
```

## 📚 Próximos Passos

Depois de conquistar a Lucy, considere:

1. **Adicionar Utilidade**: Implementar staking, governance, ou rewards
2. **Expandir Redes**: Deploy em outras chains conectadas
3. **Criar dApp**: Interface web para interação com o token
4. **Integrar DeFi**: Adicionar a pools de liquidez
5. **Marketing**: Construir comunidade e adoção

## 🔗 Links Úteis

- [Documentação ZetaChain](https://www.zetachain.com/docs/)
- [Pitch Lucy](https://pitchlucy.ai/)
- [ZetaChain Explorer](https://zetachain.blockscout.com/)
- [Faucet Testnet](https://labs.zetachain.com/get-zeta)
- [Discord ZetaChain](https://discord.gg/zetachain)

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**🎉 Boa sorte convincendo a Lucy! 🎉**

Se você conseguir convencê-la, não esqueça de compartilhar sua vitória na comunidade ZetaChain!
