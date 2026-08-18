# Justiça Abrange

Protótipo do Grupo 1 da oficina de construção com IA do Hackaton Codesinfo, realizado no 21º Congresso da Abraji.

O projeto explora como dados agregados sobre processos de violência doméstica podem ser apresentados por comarca sem esconder lacunas de cobertura. A versão atual é uma demonstração interativa com dados sintéticos: nenhum número exibido deve ser usado como estatística real.

## O que o protótipo faz

- alterna entre processos novos, pendentes, julgados e baixados;
- permite escolher diferentes períodos desde 2020;
- apresenta visualizações por comarca e em formato de mapa de calor;
- exibe detalhes e outros indicadores do território selecionado;
- mantém territórios sem cobertura identificados como `sem dados`, nunca como zero;
- gera um ranking demonstrativo das comarcas com maior valor no recorte;
- documenta as principais limitações metodológicas antes do uso jornalístico.

## Estado atual

O mapa, as comarcas, os totais e a data de atualização são fictícios. O protótipo valida a navegação e a forma de comunicar cobertura, concentração e ausência de dados, mas ainda não consulta a API Pública do DataJud/CNJ.

- [Abrir a demonstração](https://codesinfo-abraji-oficina-grupo-1.burgos.chatgpt.site)
- [Ler o registro das interações no Slack](public/historico-interacoes.html)

## Como rodar localmente

### Pré-requisitos

- Node.js 22.13 ou mais recente;
- npm.

### Instalação e desenvolvimento

```bash
npm ci
npm run dev
```

Abra no navegador o endereço informado pelo terminal.

### Validação e execução de produção

```bash
npm test
npm run build
npm run start
```

O código principal da interface está em `app/page.tsx`; os estilos ficam em `app/globals.css`.

## Roadmap possível

- [ ] Integrar a API Pública do DataJud/CNJ e manter a fonte de cada número rastreável.
- [ ] Validar e documentar os códigos TPU usados no recorte de violência doméstica.
- [ ] Adotar uma malha geográfica real de comarcas, com licença e tabela de correspondência verificáveis.
- [ ] Criar uma rotina de conciliação entre tribunal, comarca, período e indicadores.
- [ ] Exibir data de atualização, cobertura e qualidade dos dados por território.
- [ ] Permitir comparações temporais, variação percentual e séries históricas.
- [ ] Exportar recortes e notas metodológicas para apoiar a apuração jornalística.
- [ ] Ampliar testes de acessibilidade, navegação por teclado e uso em dispositivos móveis.

## Princípios editoriais

- Ausência de cobertura não é zero.
- Toda métrica precisa ter definição, período e fonte visíveis.
- O produto trabalha com dados agregados e não deve expor informações processuais individuais.
- Resultados automatizados apoiam a apuração, mas não substituem revisão jornalística.
