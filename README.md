# Gerador de Carteirinha

Aplicação interna em Next.js para criar carteirinhas estudantis com prévia instantânea, foto por arrastar-e-soltar, máscaras, QR Code, código de barras, exportação PNG/PDF e impressão.

## Executar

```bash
npm install
npm run dev
```

Use `npm run test`, `npm run test:e2e` e `npm run build` para validação.

## Arquitetura

`src/app` contém a composição do Next.js. `pages` orquestra casos de uso; `components` contém apenas UI; `validators`, `utils`, `constants`, `types` e `store` mantêm regras, formatação, contratos e estado separados. O formulário publica dados por callback e a carteirinha os recebe por contrato tipado, evitando regra de negócio no componente visual.

## Ajuste visual

O modelo atual foi reconstruído a partir do screenshot entregue. Para ajuste pixel-perfect definitivo, forneça o arquivo original em resolução nativa e os ativos institucionais autorizados (logo, fontes e eventual verso/QR/barcode).
