import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
  const customerService = req.scope.resolve(Modules.CUSTOMER)
  const customerId = req.params.id

  try {
    const customer = await customerService.retrieveCustomer(customerId)
    const reason = (req.body as { reason?: string })?.reason || ""

    await customerService.updateCustomers(customerId, {
      metadata: {
        ...(customer.metadata || {}),
        trade_account_status: "rejected",
        trade_account_rejected_at: new Date().toISOString(),
        trade_account_rejection_reason: reason,
      },
    })

    logger.info(`[Trade Account] Rejected customer: ${customerId}`)

    return res.json({
      message: "Trade account rejected",
      customer_id: customerId,
    })
  } catch (error) {
    logger.error(`[Trade Account] Rejection failed for ${customerId}: ${error}`)
    return res.status(500).json({ message: "Failed to reject trade account" })
  }
}
