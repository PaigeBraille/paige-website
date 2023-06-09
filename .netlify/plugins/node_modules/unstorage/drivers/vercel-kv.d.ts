import type { RedisConfigNodejs } from "@upstash/redis";
export interface VercelKVOptions extends Partial<RedisConfigNodejs> {
    base?: string;
    env?: false | string;
}
declare const _default: (opts?: VercelKVOptions | undefined) => import("../types").Driver;
export default _default;
