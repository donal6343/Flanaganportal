import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { INTACT_MODULE } from "../../../../../../modules/intact"
import { IntactModuleService } from "../../../../../../modules/intact/service/intact-module"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    const customerEmail = (req as unknown as { auth_context?: { actor_id: string } }).auth_context?.actor_id
    if (!customerEmail) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const invoiceNumber = req.params.invoiceNumber

    const intactService: IntactModuleService = req.scope.resolve(INTACT_MODULE)
    const pdfBuffer = await intactService.getInvoicePdf(invoiceNumber)

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="invoice-${invoiceNumber}.pdf"`
    )
    return res.send(pdfBuffer)
  } catch (error) {
    logger.error(`[Intact] Failed to fetch invoice PDF: ${error}`)
    return res.status(500).json({ message: "Failed to fetch invoice PDF" })
  }
}
