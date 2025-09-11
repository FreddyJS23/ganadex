import { assignmentNumberBullCalfShema } from "@/validations/assignmentNumberBullCalfShema";
import {
  createAdminBirthShema,
  createBaseBirthShema,
  createBirthShema,
  updateBirhthShema,
} from "@/validations/birthShema";
import { createBullShema } from "@/validations/bullShema";
import { createBeefShema } from "@/validations/discardedCattleShema";
import { castleEditShema, castleShema } from "@/validations/castleShema";
import {
  createAdminCheckUpShema,
  createBaseCheckUpShema,
  editCheckUpShema,
} from "@/validations/checkUpShema";
import { createConfigurationShema } from "@/validations/configurationShema";
import { createUserShema } from "@/validations/createUser";
import { createCustomerShema } from "@/validations/Customer";
import { createDeathCastleShema } from "@/validations/deathCastle";
import { createPriceMilkShema } from "@/validations/priceMilkShema";
import { rangeDatesToReportsShema } from "@/validations/rangeDatesShema";
import { createSaleCattleShema } from "@/validations/saleCattle";
import { createSaleMilkShema } from "@/validations/saleMilkShema";
import { createServeShema, updateServeShema } from "@/validations/serveShema";
import { createStaffShema } from "@/validations/staffShema";
import { createSupplyShema } from "@/validations/supplyShema";
import {
  createWeightMilkShema,
  updateWeightMilkShema,
} from "@/validations/WeightMilkShema";
import { yearsToGenerateReportShema } from "@/validations/yearsTotGenerateReportShema";
import { z } from "zod";
import { createPajuelaToroSchema } from "@/validations/pajuelaToroShema";
import { createVaccinationDayShema } from "@/validations/VaccinationDay";
import { createHaciendaShema } from "@/validations/hacienda";
import { weightsShema } from "@/validations/weightsShema";
import { updateConfigurationShema } from "@/validations/updateConfiguration";
import { createTypeCheckShema } from "@/validations/typeCheck";
import { createCausaFallecimientoShema } from "@/validations/causaFallecimiento";
import { recoveryPasswordShema } from "@/validations/recoveryPassword";
import {
  createOrUpdateResponseSecurityShema,
  createResponsesSecurityShema,
  updateResponseSecurityShema,
} from "@/validations/responseSecurity";
import { createVaccineSchema } from "@/validations/vaccineSchema";

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

export type UpdateUser = {
  usuario: string;
  password: string;
};

export type UpdateConfiguration = z.infer<typeof updateConfigurationShema>;

export type updateWeight = z.infer<typeof weightsShema>;

export type CreateCastle = z.infer<typeof castleShema>;

export type EditCastle = z.infer<typeof castleEditShema>;

export type CreateBaseBirth = z.infer<typeof createBaseBirthShema>;

export type CreateAdminBirth = z.infer<typeof createAdminBirthShema>;

export type CreateBull = z.infer<typeof createBullShema>;

export type CreateBeef = z.infer<typeof createBeefShema>;

export type CreateAssigmentNumberBullCalf = z.infer<
  typeof assignmentNumberBullCalfShema
>;

export type UpdateBirh = z.infer<typeof updateBirhthShema>;

export type CreateAdminCheckUp = z.infer<typeof createAdminCheckUpShema>;

export type CreateBaseCheckUp = z.infer<typeof createBaseCheckUpShema>;

export type EditCheckUp = z.infer<typeof editCheckUpShema>;

export type CreateConfiguration = z.infer<typeof createConfigurationShema>;

export type CreateConfiguration = z.infer<typeof createConfigurationShema>;

export type CreateUser = z.infer<typeof createUserShema>;

export type CreateCustomer = z.infer<typeof createCustomerShema>;

export type CreateDeathCastle = z.infer<typeof createDeathCastleShema>;

export type CreatePriceMilk = z.infer<typeof createPriceMilkShema>;

export type CreateSaleMilk = z.infer<typeof createSaleMilkShema>;

export type CreateServe = z.infer<typeof createServeShema>;

export type UpdateServe = z.infer<typeof updateServeShema>;

export type CreateStaff = z.infer<typeof createStaffShema>;

export type CreateSupply = z.infer<typeof createSupplyShema>;

export type CreateWeightMilk = z.infer<typeof createWeightMilkShema>;

export type UpdateWeightMilk = z.infer<typeof updateWeightMilkShema>;

export type RangeDatesToReports = z.infer<typeof rangeDatesToReportsShema>;

export type YearToReports = z.infer<typeof yearsToGenerateReportShema>;

export type CreateSaleCattle = z.infer<typeof createSaleCattleShema>;

export type CreatePajuelaToro = z.infer<typeof createPajuelaToroSchema>;

export type CreateVaccinacionDay = z.infer<typeof createVaccinationDayShema>;

export type CreateHacienda = z.infer<typeof createHaciendaShema>;

export type CreateTypeCheck = z.infer<typeof createTypeCheckShema>;

export type CreateCausaFallecimiento = z.infer<
  typeof createCausaFallecimientoShema
>;

export type RecoveryPassword = z.infer<typeof recoveryPasswordShema>;

export type CreateOrUpdateResponseSecurity = z.infer<
  typeof createOrUpdateResponseSecurityShema
>;

export type CreateResponseSecurity = z.infer<
  typeof createResponsesSecurityShema
>;

export type CreateVaccine = z.infer<typeof createVaccineSchema>;
