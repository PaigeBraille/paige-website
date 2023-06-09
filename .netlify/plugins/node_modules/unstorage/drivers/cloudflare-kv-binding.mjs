import { createError, defineDriver } from "./utils/index.mjs";
const DRIVER_NAME = "cloudflare-kv-binding";
export default defineDriver((opts = {}) => {
  async function getKeys(base) {
    const binding = getBinding(opts.binding);
    const kvList = await binding.list(base ? { prefix: base } : void 0);
    return kvList.keys.map((key) => key.name);
  }
  return {
    name: DRIVER_NAME,
    options: opts,
    async hasItem(key) {
      const binding = getBinding(opts.binding);
      return await binding.get(key) !== null;
    },
    getItem(key) {
      const binding = getBinding(opts.binding);
      return binding.get(key);
    },
    setItem(key, value) {
      const binding = getBinding(opts.binding);
      return binding.put(key, value);
    },
    removeItem(key) {
      const binding = getBinding(opts.binding);
      return binding.delete(key);
    },
    // TODO: use this.getKeys once core is fixed
    getKeys,
    async clear() {
      const binding = getBinding(opts.binding);
      const keys = await getKeys();
      await Promise.all(keys.map((key) => binding.delete(key)));
    }
  };
});
function getBinding(binding = "STORAGE") {
  let bindingName = "[binding]";
  if (typeof binding === "string") {
    bindingName = binding;
    binding = globalThis[bindingName] || globalThis.__env__?.[bindingName];
  }
  if (!binding) {
    throw createError(
      DRIVER_NAME,
      `Invalid binding \`${bindingName}\`: \`${binding}\``
    );
  }
  for (const key of ["get", "put", "delete"]) {
    if (!(key in binding)) {
      throw createError(
        DRIVER_NAME,
        `Invalid binding \`${bindingName}\`: \`${key}\` key is missing`
      );
    }
  }
  return binding;
}
