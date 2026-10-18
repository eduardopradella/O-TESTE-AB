# Distribuidor A/B para Vercel

Este projeto é um ponto de entrada que sorteia A ou B para cada navegador e guarda a escolha em cookie por 30 dias. Usa rewrite, não redirect, então a URL do distribuidor permanece no navegador.

## 1. Confirme as URLs das duas páginas

Cada variável deve ser a URL HTTPS independente de um projeto/deploy que mostre a versão correta.

- `AB_URL_A`: URL que abre a página rosa.
- `AB_URL_B`: URL que abre a outra página.

Não use `https://bigodechines.vercel.app` como B se esse endereço agora abre a página rosa. Use a URL própria do deploy que você confirmou que abre a versão diferente.

## 2. Subir no GitHub e publicar

1. Crie um repositório novo chamado `teste-ab-vercel`.
2. Envie todos os arquivos e a pasta `app` para a raiz do repositório.
3. Importe o repositório como um projeto novo na Vercel.
4. Em Settings → Environment Variables, crie:
   - `AB_URL_A` = URL independente da página rosa
   - `AB_URL_B` = URL independente da outra página
5. Faça o deploy. Se já havia feito, faça um redeploy após configurar as variáveis.
6. Teste usando o endereço temporário do distribuidor, sem associar ainda o domínio principal.

## 3. Teste antes de trocar o domínio

- Abra o endereço temporário em uma janela anônima e confirme qual página aparece.
- Atualize: a variante deve permanecer a mesma enquanto o cookie existir.
- Abra outra janela anônima para testar uma nova atribuição. A divisão tende a 50/50 ao longo de muitas visitas, mas não será exatamente metade em amostras pequenas.
- Teste imagens, CSS, vídeo, botões, checkout e parâmetros UTM.

## Limitações importantes

- O rewrite externo pode não funcionar corretamente com todos os sites. Se a página usa caminhos absolutos, cookies, URLs canónicas, formulários ou scripts ligados ao domínio original, alguns recursos ou ações podem sair do distribuidor. Faça testes completos antes de usar em anúncios.
- O cookie identifica o navegador, não uma pessoa entre dispositivos; pode ser apagado ou bloqueado.
- O código não configura sozinho relatórios de conversão por variante no Pixel da Meta. Isso precisa ser validado separadamente.
- A Vercel Hobby tem restrições de uso comercial. Verifique as condições do plano antes de usar em páginas de vendas: https://vercel.com/docs/limits/fair-use-guidelines
- Não altere o domínio principal até validar o endereço temporário e confirmar as duas versões.
