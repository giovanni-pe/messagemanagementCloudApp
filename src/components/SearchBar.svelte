<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    let searchQuery = "";
    let fromDate = "";
    let toDate = "";
  
    function search() {
      dispatch("search", { searchQuery, fromDate, toDate });
    }
  </script>
  
  <div class="search-bar">
    <input type="text" bind:value={searchQuery} placeholder="Buscar..." />
    <input type="date" bind:value={fromDate} />
    <input type="date" bind:value={toDate} />
    <button on:click={search}>BUSCAR</button>
  </div>
  
  <style>
    .search-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  </style>
  