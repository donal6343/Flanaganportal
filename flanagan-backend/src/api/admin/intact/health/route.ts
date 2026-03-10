import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { INTACT_MODULE } from "../../../../modules/intact"
import { IntactModuleService } from "../../../../modules/intact/service/intact-module"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const intactService: IntactModuleService = req.scope.resolve(INTACT_MODULE)

  const healthy = await intactService.healthCheck()

  return res.json({
    status: healthy ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  })
}
