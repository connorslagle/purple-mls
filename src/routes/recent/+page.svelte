<script>
    import { onMount } from 'svelte';
    import { fetchRecentNotes, getUser } from '$lib/ndk';
    import { goto } from '$app/navigation';
    
    let recentNotes = [];
    
    onMount(async () => {
      if (!getUser()) {
        goto('/login');
        return;
      }
      try {
        recentNotes = await fetchRecentNotes();
      } catch (error) {
        console.error("Error fetching notes:", error);
        alert('Error fetching notes. Please try again.');
      }
    });
  </script>
  
  <h1>Recent Notes</h1>
  {#each recentNotes as note}
    <div>{note.author}: {note.content}</div>
  {/each}
  