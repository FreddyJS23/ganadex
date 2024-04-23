import { assignmentNumberBullCalfShema, createBullshema } from "@/validations/assignmentNumberBullCalfShema";
import { createBirthShema } from "@/validations/birthShema";
import { castleShema } from "@/validations/castleShema";
import { createCheckUpShema } from "@/validations/checkUpShema";
import { createConfigurationShema } from "@/validations/configurationShema";
import { createUserShema } from "@/validations/createUser";
import { createCustomerShema } from "@/validations/Customer";
import { createDeathCastleShema } from "@/validations/deathCastle";
import { createPriceMilkShema} from "@/validations/priceMilkShema";
import { createSaleMilkShema } from "@/validations/saleMilkShema";
import { createServeShema } from "@/validations/serveShema";
import { createStaffShema } from "@/validations/staffShema";
import { createSupplyShema } from "@/validations/supplyShema";
import { createWeightMilkShema } from "@/validations/WeightMilkShema";
import { z } from "zod";

export type Login = {
    usuario: string;
    password: string;
};

export type CreateUser = {
    nombre: string;
    apellido: string;
    usuario: string;
    correo: string;
    password: string;
    password2: string;
};

export type CreateCastle=z.infer<typeof castleShema>

export type CreateBirth=z.infer<typeof createBirthShema>

export type CreateBull=z.infer<typeof createBullshema>

export type CreateAssigmentNumberBullCalf=z.infer<typeof assignmentNumberBullCalfShema>

export type CreateCheckUp=z.infer<typeof createCheckUpShema>

export type CreateCheckUp=z.infer<typeof createCheckUpShema>

export type CreateConfiguration=z.infer<typeof createConfigurationShema>

export type CreateConfiguration=z.infer<typeof createConfigurationShema>

export type CreateUser=z.infer<typeof createUserShema>

export type CreateCustomer=z.infer<typeof createCustomerShema>

export type CreateDeathCastle=z.infer<typeof createDeathCastleShema>

export type CreatePriceMilk=z.infer<typeof createPriceMilkShema>

export type CreateSaleMilk=z.infer<typeof createSaleMilkShema>

export type CreateServe=z.infer<typeof createServeShema>

export type CreateStaff=z.infer<typeof createStaffShema>

export type CreateSupply=z.infer<typeof createSupplyShema>

export type CreateWeightMilk=z.infer<typeof createWeightMilkShema>
