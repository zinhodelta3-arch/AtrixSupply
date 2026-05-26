async function delay() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default async function TesteLoadingPage() {
  await delay();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#09090b",
        color: "#fff",
      }}
    >
      <h1>Página carregada com sucesso!</h1>
    </main>
  );
}