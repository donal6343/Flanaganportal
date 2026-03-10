import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerService = req.scope.resolve(Modules.CUSTOMER)

  const status = (req.query.status as string) || "pending"
  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0

  const [customers, count] = await customerService.listAndCountCustomers(
    {
      metadata: {
        trade_account_status: status,
      },
    } as Parameters<typeof customerService.listAndCountCustomers>[0],
    {
      take: limit,
      skip: offset,
      order: { created_at: "DESC" },
    }
  )

  return res.json({
    customers,
    count,
    limit,
    offset,
  })
}
