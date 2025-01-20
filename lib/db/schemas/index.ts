export * from "@/lib/db/schemas/auth";
export * from "@/lib/db/schemas/chat";
export * from "@/lib/db/schemas/order";
export * from "@/lib/db/schemas/product";

import * as auth from "@/lib/db/schemas/auth";
import * as chat from "@/lib/db/schemas/chat";
import * as order from "@/lib/db/schemas/order";
import * as product from "@/lib/db/schemas/product";

export const schema = {
  ...auth,
  ...chat,
  ...order,
  ...product,
};
