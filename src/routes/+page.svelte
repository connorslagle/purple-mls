
<script lang="ts">
    import NDK, { NDKUser, type NDKUserProfile } from "@nostr-dev-kit/ndk";
    import { NDKNip07Signer } from "@nostr-dev-kit/ndk";
    import { browser } from "$app/environment";
    import { writable } from 'svelte/store';

    let currentUser: NDKUser;
    let loggedIn = false;

    const ndk = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://purplepag.es"],
    });

    if (browser) {
        ndk.connect().then(() => {
            console.log('Connected');
        })
    }

    async function login(ndk: NDK): Promise<NDKUser>{
        let user: NDKUser;

        ndk.signer = new NDKNip07Signer();
        user = await ndk.signer.user();
        return user
    }
    
    async function login_here() {
        const user = await login(ndk);
        loggedIn = true;
        currentUser = user;
    }
</script>

<h1>Purple MLS</h1>

<button on:click={login_here}>Log in with Nostr</button>

{#if loggedIn}
    {#await currentUser.fetchProfile() then events}
        <h2>
            Logged in as {currentUser.profile?.name}
        </h2>
        <p>
            <img src={currentUser.profile?.image} style="width: 100px; height: 100px;" alt="asdf" />
        </p>
    {/await}
{/if}