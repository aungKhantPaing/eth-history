import { defineStore } from "pinia";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";

export const useEthereumStore = defineStore("ethereum", {
  state: () => ({
    accounts: [] as string[],
    network: null as ethers.providers.Network | null,
    onboarding: new MetaMaskOnboarding({ forwarderMode: "INJECT" }),
  }),

  getters: {
    currentAccount(state) {
      return state.accounts[0];
    },
  },

  actions: {
    async connectWallet() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as unknown as ethers.providers.ExternalProvider
      );
      window.ethereum.on("accountsChanged", this.handleAccountChange);
      window.ethereum.on("chainChanged", this.handleChainChange);
      await provider
        .send("eth_requestAccounts", [])
        .then(this.handleAccountChange);
      // const signer = provider.getSigner();
      // this.walletAddress = await signer.getAddress();
      this.network = await provider.getNetwork();
    },

    handleAccountChange(accounts: []) {
      console.log("accountChanged", accounts);
      this.accounts = accounts || [];
    },

    handleChainChange(newChain: any) {
      console.log({ newChain });
      window.location.reload();
    },
  },
});
