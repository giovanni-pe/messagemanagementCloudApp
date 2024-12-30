<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    export let title;
  
    // Lista inicial de mensajes por confirmar
    export let messages = [
      { user: "Juan Ramos", message: "M2", confirmed: false },
      { user: "Luis Ramos", message: "M3", confirmed: false },
    ];
  
    function toggleConfirmation(index) {
      messages[index].confirmed = !messages[index].confirmed; // Cambia el estado
    }
  
    function confirmMessages() {
      const confirmedMessages = messages.filter((msg) => msg.confirmed);
      dispatch("confirmMessages", confirmedMessages); // Envía solo los confirmados
    }
  
    function closeModal() {
      dispatch("closeModal");
    }
  </script>
  
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-dialog" on:click|stopPropagation>
      <header class="modal-header">
        <h2>{title}</h2>
      </header>
      <div class="modal-body">
        <ul class="message-list">
          {#each messages as { user, message, confirmed }, index}
            <li class="message-item">
              <span>{user}</span>
              <span>{message}</span>
              <label class="switch">
                <input
                  type="checkbox"
                  bind:checked={messages[index].confirmed}
                  on:change={() => toggleConfirmation(index)}
                />
                <span class="slider"></span>
              </label>
            </li>
          {/each}
        </ul>
      </div>
      <footer class="modal-footer">
        <button type="button" class="button" on:click={confirmMessages}>Confirmar</button>
      </footer>
    </div>
  </div>
  
  <style>
    /* Fondo del modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    /* Contenedor del modal */
    .modal-dialog {
      background: #fff;
      padding: 1.5rem;
      width: 450px;
      max-width: 90%;
      border: 0;
      border-right: 4px solid #000;
      border-bottom: 4px solid #000;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    /* Encabezado */
    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
      color: #000;
    }
  
    /* Cuerpo del modal */
    .modal-body {
      margin: 1rem 0;
    }
  
    .message-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .message-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ccc;
    }
  
    .message-item span {
      font-size: 0.9rem;
      color: #333;
    }
  
    /* Interruptor (Switch) */
    .switch {
      position: relative;
      display: inline-block;
      width: 34px;
      height: 20px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 20px;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 14px;
      width: 14px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  
    input:checked + .slider {
      background-color: #6200ee; /* Morado */
    }
  
    input:checked + .slider:before {
      transform: translateX(14px);
    }
  
    /* Pie del modal */
    .modal-footer {
      display: flex;
      justify-content: flex-end;
    }
  
    .button {
      padding: 0.5rem 1.2rem;
      border: 1px solid #000;
      background: #fff;
      color: #000;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: bold;
    }
  
    .button:hover {
      background: #f0f0f0;
    }
  </style>
  