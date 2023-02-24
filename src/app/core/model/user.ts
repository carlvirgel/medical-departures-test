import { Address } from "./address";
import { Company } from "./company";

export interface User {
    id?: number | any,
    name?: string | any,
    username?: string | any,
    email?:  string | any,
    address?: Address,
    phone?: string | any,
    website?: any,
    company?: Company
}