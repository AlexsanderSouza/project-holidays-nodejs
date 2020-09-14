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
- O endpoint para consultar feriados:
```
/feriados/CODIGO-IBGE/ANO-MES-DIA/
```
Onde CODIGO-IBGE é o codigo do estado ou município e ANO-MES-DIA tem o formato "AAAA-MM-DD"
## .env
- o arquivo .env precisa da URL da base de dados caso seja postgres no seguinte formato
```
DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
```
