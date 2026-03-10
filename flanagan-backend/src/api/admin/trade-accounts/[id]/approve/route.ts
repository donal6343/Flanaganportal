import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { approveTradeAccountWorkflow } from "../../../../../workflows/approve-trade-account"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
  const customerId = req.params.id

  try {
    const { result } = await approveTradeAccountWorkflow(req.scope).run({
      input: { customer_id: customerId },
    })

    logger.info(`[Trade Account] Approved customer: ${customerId}`)

    return res.json({
      message: "Trade account approved",
      customer_id: result.customer_id,
    })
  } catch (error) {
    logger.error(`[Trade Account] Approval failed for ${customerId}: ${error}`)
    return res.status(500).json({ message: "Failed to approve trade account" })
  }
}
