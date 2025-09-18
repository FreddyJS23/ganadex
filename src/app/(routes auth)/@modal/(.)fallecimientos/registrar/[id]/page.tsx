import { CreateDeathCattle } from "@/components/create item in modal/create death cattle";
import { ResponseCausasFallecimiento } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { causas_fallecimiento }: ResponseCausasFallecimiento = await submitForm(
    "causasFallecimiento",
  );

  return <CreateDeathCattle causas_fallecimeinto={causas_fallecimiento} />;
}
