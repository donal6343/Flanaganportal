import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { INTACT_MODULE } from "../../../../modules/intact"
import { IntactModuleService } from "../../../../modules/intact/service/intact-module"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    const customerEmail = (req as unknown as { auth_context?: { actor_id: string } }).auth_context?.actor_id
    if (!customerEmail) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const intactService: IntactModuleService = req.scope.resolve(INTACT_MODULE)

    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.page_size as string) || 20

    const result = await intactService.getInvoices(
      customerEmail,
      page,
      pageSize
    )

    return res.json(result)
  } catch (error) {
    logger.error(`[Intact] Failed to fetch invoices: ${error}`)
    return res.status(500).json({ message: "Failed to fetch invoices" })
  }
}
