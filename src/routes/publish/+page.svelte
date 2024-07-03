<script>
    import { publishNote, getUser } from '$lib/ndk';
    import { goto } from '$app/navigation';
    
    let noteContent = '';
    
    async function handlePublish() {
      if (!getUser()) {
        goto('/login');
        return;
      }
      try {
        await publishNote(noteContent);
        alert('Note published!');
        noteContent = '';
      } catch (error) {
        console.error("Error publishing note:", error);
        alert('Error publishing note. Please try again.');
      }
    }
  </script>
  
  <h1>Publish Note</h1>
  <textarea bind:value={noteContent} rows="4" cols="50"></textarea>
  <br>
  <button on:click={handlePublish}>Publish Note</button>
  