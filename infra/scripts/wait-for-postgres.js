const { exec } = require("node:child_process");

function checkPostgresConnection() {
  exec("docker exec postgres-dev pg_isready --host=localhost", habdleResult);

  function habdleResult(error, stdout) {
    if (error) {
      console.error(`Erro ao verificar a conexão com o postgres: ${error}`);
      checkPostgresConnection();
      return;
    }

    console.log(stdout);
    console.log("🟢 Postgres está pronto para aceitar conexões!");
  }
}

console.log("🔴 Aguardando o postgres aceitar conexões...");
checkPostgresConnection();
