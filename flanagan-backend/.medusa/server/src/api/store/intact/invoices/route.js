"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
const intact_1 = require("../../../../modules/intact");
async function GET(req, res) {
    const logger = req.scope.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    try {
        const customerEmail = req.auth_context?.actor_id;
        if (!customerEmail) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const intactService = req.scope.resolve(intact_1.INTACT_MODULE);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 20;
        const result = await intactService.getInvoices(customerEmail, page, pageSize);
        return res.json(result);
    }
    catch (error) {
        logger.error(`[Intact] Failed to fetch invoices: ${error}`);
        return res.status(500).json({ message: "Failed to fetch invoices" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL2ludGFjdC9pbnZvaWNlcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLGtCQXlCQztBQTdCRCxxREFBcUU7QUFDckUsdURBQTBEO0FBR25ELEtBQUssVUFBVSxHQUFHLENBQUMsR0FBa0IsRUFBRSxHQUFtQjtJQUMvRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUVsRSxJQUFJLENBQUM7UUFDSCxNQUFNLGFBQWEsR0FBSSxHQUEwRCxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUE7UUFDeEcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxDQUFDO1FBRUQsTUFBTSxhQUFhLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFhLENBQUMsQ0FBQTtRQUUzRSxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUU5RCxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQzVDLGFBQWEsRUFDYixJQUFJLEVBQ0osUUFBUSxDQUNULENBQUE7UUFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQzNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFBO0lBQ3RFLENBQUM7QUFDSCxDQUFDIn0=