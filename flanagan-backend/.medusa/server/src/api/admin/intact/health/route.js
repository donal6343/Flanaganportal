"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const intact_1 = require("../../../../modules/intact");
async function GET(req, res) {
    const intactService = req.scope.resolve(intact_1.INTACT_MODULE);
    const healthy = await intactService.healthCheck();
    return res.json({
        status: healthy ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2ludGFjdC9oZWFsdGgvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxrQkFTQztBQVpELHVEQUEwRDtBQUduRCxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQWtCLEVBQUUsR0FBbUI7SUFDL0QsTUFBTSxhQUFhLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFhLENBQUMsQ0FBQTtJQUUzRSxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUVqRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDZCxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFDOUMsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0tBQ3BDLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==