<script>
    import { login, getUser } from '$lib/ndk';
    
    let loginStatus = '';
    let nip07Available = !!window.nostr;
    
    async function handleLogin() {
      try {
        await login();
        loginStatus = `Logged in with public key: ${getUser().pubkey.slice(0, 8)}...`;
      } catch (error) {
        console.error("Error logging in:", error);
        loginStatus = "Error logging in. Please try again.";
      }
    }
  </script>
  
  <h1>Login</h1>
  {#if nip07Available}
    <button on:click={handleLogin}>Login with NIP-07</button>
  {:else}
    <p>No NIP-07 extension detected. Please install a compatible extension.</p>
  {/if}
  <p>{loginStatus}</p>
  