"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const utils_1 = require("@medusajs/framework/utils");
async function tradeAccountGuard(req, res, next) {
    const authContext = req.auth_context;
    if (!authContext?.actor_id) {
        return next();
    }
    try {
        const customerService = req.scope.resolve(utils_1.Modules.CUSTOMER);
        const customer = await customerService.retrieveCustomer(authContext.actor_id);
        const status = customer.metadata?.trade_account_status;
        if (status && status !== "approved") {
            return res.status(403).json({
                message: "Your trade account is pending approval. You will be notified once activated.",
                trade_account_status: status,
            });
        }
    }
    catch {
        // If customer lookup fails, let the request through (it may fail downstream)
    }
    return next();
}
exports.default = (0, medusa_1.defineMiddlewares)({
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQW9EO0FBRXBELHFEQUFtRDtBQUVuRCxLQUFLLFVBQVUsaUJBQWlCLENBQzlCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLElBQXdCO0lBRXhCLE1BQU0sV0FBVyxHQUFJLEdBQTBELENBQUMsWUFBWSxDQUFBO0lBRTVGLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRTdFLE1BQU0sTUFBTSxHQUFJLFFBQVEsQ0FBQyxRQUFtQyxFQUFFLG9CQUFvQixDQUFBO1FBRWxGLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMxQixPQUFPLEVBQ0wsOEVBQThFO2dCQUNoRixvQkFBb0IsRUFBRSxNQUFNO2FBQzdCLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsNkVBQTZFO0lBQy9FLENBQUM7SUFFRCxPQUFPLElBQUksRUFBRSxDQUFBO0FBQ2YsQ0FBQztBQUVELGtCQUFlLElBQUEsMEJBQWlCLEVBQUM7SUFDL0IsTUFBTSxFQUFFO1FBQ047WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQztRQUNEO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=