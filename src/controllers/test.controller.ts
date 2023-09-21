import { controller, httpGet } from "inversify-express-utils"; 
import { Request,Response } from "express"; 


@controller("Test") 
class TestController { 
    constructor() {} 

    @httpGet("/test") 
    get(req:Request, res: Response) { 
        // Controller logic here 
    } 
} 
export default TestController;
