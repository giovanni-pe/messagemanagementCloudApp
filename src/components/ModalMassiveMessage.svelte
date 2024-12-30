<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    export let title;
  
    let selectedRecipients = ""; // Lista de destinatarios
    let selectedTemplate = "Plantilla 1"; // Plantilla predeterminada
    let isScheduled = false; // Indica si es programado
    let scheduledDate = ""; // Fecha programada
    let scheduledTime = ""; // Hora programada
    let requiresConfirmation = false; // Confirmación previa
  
    function saveMassiveMessage() {
      const messageDetails = {
        recipients: selectedRecipients.split(",").map((name) => name.trim()), // Convertir a array
        template: selectedTemplate,
        scheduled: isScheduled ? { date: scheduledDate, time: scheduledTime } : null,
        requiresConfirmation,
      };
      dispatch("saveMassiveMessage", messageDetails);
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
      <form class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label for="recipients">Para:</label>
            <input
              id="recipients"
              type="text"
              bind:value={selectedRecipients}
              placeholder="Escribe los nombres separados por comas"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="template">Plantilla:</label>
            <select id="template" bind:value={selectedTemplate}>
              <option value="Plantilla 1">Plantilla 1</option>
              <option value="Plantilla 2">Plantilla 2</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" bind:checked={isScheduled} />
              Programado
            </label>
          </div>
        </div>
        {#if isScheduled}
        <div class="form-row">
          <div class="form-group">
            <label for="scheduledDate">Fecha</label>
            <input id="scheduledDate" type="date" bind:value={scheduledDate} />
          </div>
          <div class="form-group">
            <label for="scheduledTime">Hora</label>
            <input id="scheduledTime" type="time" bind:value={scheduledTime} />
          </div>
        </div>
        {/if}
        <div class="form-row">
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" bind:checked={requiresConfirmation} />
              Confirmacion Previa
            </label>
          </div>
        </div>
        <footer class="modal-footer">
          <button type="button" class="button" on:click={closeModal}>Cancelar</button>
          <button type="button" class="button" on:click={saveMassiveMessage}>Guardar</button>
        </footer>
      </form>
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
  
    /* Formulario */
    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .form-row {
      display: flex;
      gap: 1rem;
    }
  
    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  
    .form-group label {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #333;
    }
  
    .form-group input,
    .form-group select {
      padding: 0.6rem;
      font-size: 0.9rem;
      border: 1px solid #ccc;
      color: #000;
      background-color: #fff;
    }
  
    .checkbox-group {
      display: flex;
      align-items: center;
    }
  
    /* Pie del modal */
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
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
  