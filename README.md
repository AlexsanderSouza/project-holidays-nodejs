# API FERIADOS
## como usar:
- executar comando para ambiente de desenvolvimento
```bash
npm run dev
```
- executar comando para ambiente de produção
```bash
npm run start
```
- executar comando para criar e popular tabela com dados padrões
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```
- executar query no banco postgres
```bash
CREATE EXTENSION unaccent;
```
- O endpoint para consultar feriados:
```
/feriados/CODIGO-IBGE/ANO-MES-DIA/
```
Onde CODIGO-IBGE é o codigo do estado ou município e ANO-MES-DIA tem o formato "AAAA-MM-DD"
## .env
O arquivo .env precisa da URL da base de dados caso seja postgres no seguinte formato
```
DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
```
## teste:
Para rodar os testes, vá até a pasta tests na raiz do projeto e execute o comando:
```bash
k6 run -e API_BASE='http://localhost:3000' tests-open.js
```