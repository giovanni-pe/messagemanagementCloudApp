<script>
    export let headers = [];
    export let rows = [];
  </script>
  
  <table>
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          <td>{row.name}</td>
          <td>{row.affiliated ? "Sí" : "No"}</td>
          <td>{row.campaign}</td>
          <td>{row.temperature}</td>
          <td>{row.states.join(" → ")}</td>
          <td>{row.lastStateDate}</td>
          <td>
            <button>Historial</button>
            <button>Mensaje</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 0.5rem;
      text-align: left;
    }
  </style>
  