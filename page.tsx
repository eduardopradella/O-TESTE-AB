export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "64px auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Distribuidor A/B configurado</h1>
      <p>
        Se você está vendo esta página, a distribuição não foi executada para esta
        requisição. Confira as variáveis AB_URL_A e AB_URL_B na Vercel e consulte
        os logs do deploy.
      </p>
    </main>
  );
}
