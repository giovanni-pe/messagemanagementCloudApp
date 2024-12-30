<script>
  import { onMount } from "svelte";
  import SearchBar from "../components/SearchBar.svelte";
  export let name;
  // Lista de mensajes
  let messages = [
    {
      to: "Juan Ramos, Luis Ramos",
      template: "M1",
      message: "Sr. {{1}}, el mensaje ....",
      sendDate: "26/12/24",
      status: "Pendiente",
    },
    {
      to: "Johan Ramos",
      template: "M2",
      message: "Sr. {{1}}, Buen día....",
      sendDate: "26/12/24",
      status: "Enviado",
    },
  ];

  // Función para manejar nuevo mensaje
  function createNewMessage() {
    console.log("Creating a new message...");
  }

  // Editar un mensaje
  function editMessage(index) {
    if (index >= 0 && index < messages.length) {
      console.log("Edit message at index:", index);
    } else {
      console.error("Invalid index:", index);
    }
  }

  // Eliminar un mensaje
  function deleteMessage(index) {
    if (index >= 0 && index < messages.length) {
      console.log("Delete message at index:", index);
      messages = messages.filter((_, i) => i !== index);
    } else {
      console.error("Invalid index:", index);
    }
  }
</script>

<div class="messages-container">
  <header>
    <h1>Bandeja de Mensajes</h1>
    <button on:click={createNewMessage} aria-label="Crear nuevo mensaje">NUEVO</button>
    <button on:click={() => (window.location.href = "/")} aria-label="Ir a contactos">
      Contactos
    </button>
  </header>

  <SearchBar />

  <table class="messages-table">
    <thead>
      <tr>
        <th>Para</th>
        <th>Plantilla</th>
        <th>Mensaje</th>
        <th>Fecha Envío</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each messages as { to, template, message, sendDate, status }, index}
        <tr>
          <td>{to}</td>
          <td>{template}</td>
          <td>{message}</td>
          <td>{sendDate}</td>
          <td>{status}</td>
          <td>
            <button on:click={() => editMessage(index)} aria-label="Editar mensaje">
              Editar
            </button>
            <button on:click={() => deleteMessage(index)} aria-label="Eliminar mensaje">
              Eliminar
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <footer>
    <button disabled aria-label="Página 1">1</button>
    <button aria-label="Página 2">2</button>
    <button aria-label="Página 3">3</button>
  </footer>
</div>

<style>
  .messages-container {
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .messages-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .messages-table th,
  .messages-table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }

  .messages-table th {
    background-color: #f4f4f9;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  footer button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
  }

  footer button:disabled {
    background: #f4f4f9;
    color: #888;
    cursor: not-allowed;
  }
</style>
