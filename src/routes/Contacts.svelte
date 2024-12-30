<script>
  import { onMount } from "svelte";
  import SearchBar from "../components/SearchBar.svelte";
  import Table from "../components/Table.svelte";
  import Pagination from "../components/Pagination.svelte";
  import ModalCreateUser from "../components/ModalCreateUser.svelte";
  import { fetchContacts } from "../services/contactsService";
  import ModalMassiveMessage from "../components/ModalMassiveMessage.svelte";
  import ModalConfirmMessages from "../components/ModalConfirmMessages.svelte";

  export let name;


  // Estado de la lista de contactos y el modal
  let contactList = [];
  let totalPageCount = 1;
  let currentPageNumber = 1;
  let isCreateUserModalVisible = false;

  // Cargar la lista de contactos con filtros
  const loadContactListWithFilters = async (filters = {}) => {
    try {
      const response = await fetchContacts({
        ...filters,
        page: currentPageNumber,
      });
      contactList = response.contacts;
      totalPageCount = response.totalPages;
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  };

  // Cargar la lista al montar el componente
  onMount(() => {
    loadContactListWithFilters();
  });

  // Manejo de eventos
  function handleSearchWithFilters(filters) {
    currentPageNumber = 1;
    loadContactListWithFilters(filters);
  }

  function handlePageChange(pageNumber) {
    currentPageNumber = pageNumber;
    loadContactListWithFilters();
  }

  function showCreateUserModal() {
    isCreateUserModalVisible = true;
  }

  function hideCreateUserModal() {
    isCreateUserModalVisible = false;
  }

  async function handleSaveNewUser(newUserData) {
    console.log("Saving new user:", newUserData);
    hideCreateUserModal();
    loadContactListWithFilters();
  }
  let isMassiveMessageModalVisible = false;

  function showMassiveMessageModal() {
    isMassiveMessageModalVisible = true;
  }

  function hideMassiveMessageModal() {
    isMassiveMessageModalVisible = false;
  }

  function handleSaveMassiveMessage(messageDetails) {
    console.log("Massive Message Details:", messageDetails);
    hideMassiveMessageModal();
  }

  let isConfirmMessagesModalVisible = false;
let messagesToConfirm = [
  { user: "Juan Ramos", message: "M2", confirmed: false },
  { user: "Luis Ramos", message: "M3", confirmed: false },
];

function showConfirmMessagesModal() {
  isConfirmMessagesModalVisible = true;
}

function hideConfirmMessagesModal() {
  isConfirmMessagesModalVisible = false;
}

function handleConfirmMessages(confirmedMessages) {
  console.log("Confirmed Messages:", confirmedMessages);
  hideConfirmMessagesModal();
}

</script>

<div class="contacts-container">
  <header>
    <h1>Contactos</h1>
    <button on:click={showCreateUserModal}>NUEVO</button>
    <button on:click={showMassiveMessageModal}>Mensaje Masivo</button>
    <button on:click={() => window.location.href = "/messages"}>Mensajes</button>

    <span on:click={showConfirmMessagesModal}>5 mensajes por confirmar...</span>
  </header>

  <SearchBar on:search={handleSearchWithFilters} />

  <Table
    headers={[
      "Usuario",
      "Afiliado",
      "Campaña",
      "Temperatura",
      "Estados",
      "Fecha Último Estado",
      "Acciones",
    ]}
    rows={contactList}
  />

  <Pagination
    total={totalPageCount}
    current={currentPageNumber}
    on:changePage={handlePageChange}
  />

  {#if isCreateUserModalVisible}
    <ModalCreateUser
      title="Nuevo Usuario"
      on:closeModal={hideCreateUserModal}
      on:saveNewUser={handleSaveNewUser}
    />
  {/if}

  {#if isMassiveMessageModalVisible}
    <ModalMassiveMessage
      title="Mensaje Masivo"
      on:closeModal={hideMassiveMessageModal}
      on:saveMassiveMessage={handleSaveMassiveMessage}
    />
  {/if}
  {#if isConfirmMessagesModalVisible}
  <ModalConfirmMessages
    title="Mensajes por Confirmar"
    {messagesToConfirm}
    on:closeModal={hideConfirmMessagesModal}
    on:confirmMessages={handleConfirmMessages}
  />
{/if}
</div>

<style>
  .contacts-container {
    padding: 1rem;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>
