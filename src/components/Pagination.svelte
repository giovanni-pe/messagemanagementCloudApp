<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    export let total = 1;
    export let current = 1;
  
    function changePage(page) {
      if (page > 0 && page <= total) {
        dispatch("changePage", page);
      }
    }
  </script>
  
  <div class="pagination">
    {#each Array(total).fill(0).map((_, i) => i + 1) as page}
      <button 
        class:active={page === current} 
        on:click={() => changePage(page)}
      >
        {page}
      </button>
    {/each}
  </div>
  
  <style>
    .pagination {
      display: flex;
      gap: 0.5rem;
    }
    .active {
      font-weight: bold;
    }
  </style>
  