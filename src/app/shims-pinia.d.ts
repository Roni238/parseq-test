declare module "@/*" {
  import type { Store } from "pinia";
  const store: Store;
  export default store;
}
