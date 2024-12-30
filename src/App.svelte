<script>
  import Router from "svelte-spa-router";

    import Contacts from "./routes/Contacts.svelte";
    import Messages from "./routes/Messages.svelte";
  
    // Define las rutas
    const routes = {
      "/": Contacts,
      "/messages":Messages,
    };
  </script>
  
  <Router {routes} />
  