"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/framework/utils");
async function POST(req, res) {
    const logger = req.scope.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const customerService = req.scope.resolve(utils_1.Modules.CUSTOMER);
    const customerId = req.params.id;
    try {
        const customer = await customerService.retrieveCustomer(customerId);
        const reason = req.body?.reason || "";
        await customerService.updateCustomers(customerId, {
            metadata: {
                ...(customer.metadata || {}),
                trade_account_status: "rejected",
                trade_account_rejected_at: new Date().toISOString(),
                trade_account_rejection_reason: reason,
            },
        });
        logger.info(`[Trade Account] Rejected customer: ${customerId}`);
        return res.json({
            message: "Trade account rejected",
            customer_id: customerId,
        });
    }
    catch (error) {
        logger.error(`[Trade Account] Rejection failed for ${customerId}: ${error}`);
        return res.status(500).json({ message: "Failed to reject trade account" });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3RyYWRlLWFjY291bnRzL1tpZF0vcmVqZWN0L3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esb0JBNEJDO0FBOUJELHFEQUE4RTtBQUV2RSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDaEUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEUsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBRWhDLElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sTUFBTSxHQUFJLEdBQUcsQ0FBQyxJQUE0QixFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUE7UUFFOUQsTUFBTSxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtZQUNoRCxRQUFRLEVBQUU7Z0JBQ1IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUM1QixvQkFBb0IsRUFBRSxVQUFVO2dCQUNoQyx5QkFBeUIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDbkQsOEJBQThCLEVBQUUsTUFBTTthQUN2QztTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFFL0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2QsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxXQUFXLEVBQUUsVUFBVTtTQUN4QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLFVBQVUsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQzVFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFBO0lBQzVFLENBQUM7QUFDSCxDQUFDIn0=