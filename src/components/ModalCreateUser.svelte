<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    export let title;
  
    let newUserName = "";
    let newUserCampaign = "Campaña 1";
    let newUserTemperature = "Tibio";
    let isNewUserAffiliated = false;
  
    function saveNewUser() {
      const newUserDetails = {
        name: newUserName,
        campaign: newUserCampaign,
        temperature: newUserTemperature,
        affiliated: isNewUserAffiliated,
      };
      dispatch("saveNewUser", newUserDetails);
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
            <label for="newUserName">Nombre</label>
            <input id="newUserName" type="text" bind:value={newUserName} placeholder="Nombre" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="newUserCampaign">Campaña:</label>
            <select id="newUserCampaign" bind:value={newUserCampaign}>
              <option value="Campaña 1">Campaña 1</option>
              <option value="Campaña 2">Campaña 2</option>
            </select>
          </div>
          <div class="form-group">
            <label for="newUserTemperature">Temperatura:</label>
            <select id="newUserTemperature" bind:value={newUserTemperature}>
              <option value="Frío">Frío</option>
              <option value="Tibio">Tibio</option>
              <option value="Caliente">Caliente</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" bind:checked={isNewUserAffiliated} />
              Afiliado
            </label>
          </div>
        </div>
        <footer class="modal-footer">
          <button type="button" class="button cancel-button" on:click={closeModal}>Cancelar</button>
          <button type="button" class="button save-button" on:click={saveNewUser}>Guardar</button>
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
      background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    /* Contenedor del modal */
    .modal-dialog {
      background: #fff; /* Fondo blanco */
      padding: 1.5rem;
      width: 450px;
      max-width: 90%;
      border: 0; /* Sin bordes adicionales */
      border-right: 4px solid #000; /* Borde negro derecho */
      border-bottom: 4px solid #000; /* Borde negro inferior */
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    /* Encabezado del modal */
    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
      color: #000; /* Texto negro */
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
      color: #333; /* Texto gris oscuro */
    }
  
    .form-group input,
    .form-group select {
      padding: 0.6rem;
      font-size: 0.9rem;
      border: 1px solid #ccc; /* Bordes grises */
      color: #000; /* Texto negro */
      background-color: #fff; /* Fondo blanco */
    }
  
    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #000; /* Borde negro al enfocar */
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
      border: 1px solid #000; /* Bordes negros */
      background: #fff; /* Fondo blanco */
      color: #000; /* Texto negro */
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: bold;
    }
  
    .button:hover {
      background: #f0f0f0; /* Fondo gris claro al pasar el cursor */
    }
  </style>