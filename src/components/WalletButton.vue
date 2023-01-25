<script lang="ts" setup>
import { onMounted } from "vue";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useEthereumStore } from "@/stores/ethereum";

const { connectWallet, onboarding } = useEthereumStore();
async function onConnect() {
  await connectWallet();
}

const ethereumStore = useEthereumStore();

onMounted(() => {
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    onboarding.stopOnboarding();
  }
});
</script>

<template>
  <v-chip
    v-if="!MetaMaskOnboarding.isMetaMaskInstalled()"
    prepend-icon="mdi-puzzle-outline"
    href="https://metamask.io/"
    target="blank"
    @click="onboarding.startOnboarding()"
  >
    Install MetaMask
  </v-chip>
  <v-chip v-else-if="ethereumStore.currentAccount" prepend-icon="mdi-wallet-outline">
    {{ $format.walletAddress(ethereumStore.currentAccount) }}
    ({{ ethereumStore.network?.name }})
  </v-chip>
  <v-chip v-else @click="onConnect" prepend-icon="mdi-connection"> Connect </v-chip>
</template>
