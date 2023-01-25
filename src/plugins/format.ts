import type { App } from "vue";

const format = {
  walletAddress(address: string) {
    const head = String(address).substring(0, 5);
    const tail = String(address).substring(address.length - 4, address.length);
    return `${head}...${tail}`;
  },
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$format = format;
  },
};

declare module "vue" {
  interface ComponentCustomProperties {
    $format: typeof format;
  }
}
