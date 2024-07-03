<script>
    import NDK from '@nostr-dev-kit/ndk';
    import { onMount } from 'svelte';
    import { initNDK } from '$lib/ndk';
    
    onMount(async () => {
      await initNDK();
    });
  </script>
  
  <nav>
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/publish">Publish Note</a>
    <a href="/recent">Recent Notes</a>
  </nav>
  
  <slot />
