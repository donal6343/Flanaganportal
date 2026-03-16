"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const utils_1 = require("@medusajs/framework/utils");
async function GET(req, res) {
    const customerService = req.scope.resolve(utils_1.Modules.CUSTOMER);
    const status = req.query.status || "pending";
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const [customers, count] = await customerService.listAndCountCustomers({
        metadata: {
            trade_account_status: status,
        },
    }, {
        take: limit,
        skip: offset,
        order: { created_at: "DESC" },
    });
    return res.json({
        customers,
        count,
        limit,
        offset,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3RyYWRlLWFjY291bnRzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBMEJDO0FBNUJELHFEQUFtRDtBQUU1QyxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTNELE1BQU0sTUFBTSxHQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBaUIsSUFBSSxTQUFTLENBQUE7SUFDeEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBZSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFeEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLGVBQWUsQ0FBQyxxQkFBcUIsQ0FDcEU7UUFDRSxRQUFRLEVBQUU7WUFDUixvQkFBb0IsRUFBRSxNQUFNO1NBQzdCO0tBQzZELEVBQ2hFO1FBQ0UsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7S0FDOUIsQ0FDRixDQUFBO0lBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2QsU0FBUztRQUNULEtBQUs7UUFDTCxLQUFLO1FBQ0wsTUFBTTtLQUNQLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==