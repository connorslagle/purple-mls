import NDK from '@nostr-dev-kit/ndk';

let ndk;
let user = null;

export async function initNDK() {
  if (!ndk) {
    ndk = new NDK({
      explicitRelayUrls: ["wss://relay.damus.io"]
    });
    await ndk.connect();
  }
  return ndk;
}

export function getUser() {
  return user;
}

export async function login() {
  if (window.nostr) {
    const publicKey = await window.nostr.getPublicKey();
    user = ndk.getUser({pubkey: publicKey});
    return user;
  }
  throw new Error("NIP-07 extension not found");
}

export async function publishNote(content) {
  const event = new NDK.NDKEvent(ndk);
  event.kind = 1;
  event.content = content;
  await event.sign(user);
  await ndk.publish(event);
}

export async function fetchRecentNotes() {
  const filter = {kinds: [1], limit: 10};
  const events = await ndk.fetchEvents(filter);
  return Array.from(events).map(event => ({
    author: event.author.pubkey.slice(0, 8),
    content: event.content
  }));
}
