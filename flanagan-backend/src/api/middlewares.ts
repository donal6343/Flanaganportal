import { defineMiddlewares } from "@medusajs/medusa"
import type { MedusaNextFunction, MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

async function tradeAccountGuard(
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) {
  const authContext = (req as unknown as { auth_context?: { actor_id: string } }).auth_context

  if (!authContext?.actor_id) {
    return next()
  }

  try {
    const customerService = req.scope.resolve(Modules.CUSTOMER)
    const customer = await customerService.retrieveCustomer(authContext.actor_id)

    const status = (customer.metadata as Record<string, string>)?.trade_account_status

    if (status && status !== "approved") {
      return res.status(403).json({
        message:
          "Your trade account is pending approval. You will be notified once activated.",
        trade_account_status: status,
      })
    }
  } catch {
    // If customer lookup fails, let the request through (it may fail downstream)
  }

  return next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/carts*",
      middlewares: [tradeAccountGuard],
    },
    {
      matcher: "/store/orders*",
      middlewares: [tradeAccountGuard],
    },
  ],
})
