"use client";

import {
  Tab,
  Tabs,
  useDisclosure,
  Button as ButtonNextUI,
} from "@nextui-org/react";
import { TableVeterinaryUsers } from "../tables/veterinary users";
import { SelectVeterinaryNotUser } from "../select veterenary not user";
import {
  type Configuracion,
  type Hacienda,
  type LogEvento,
  type PreguntasSeguridad,
  type RespuestasSeguridad,
  type UserLoginInfo,
  type UserVeterinaryInfo,
  type veterinario,
} from "@/types";
import { Button } from "@/ui/Button";
import IconEditar from "@/icons/icono-editar.svg";
import { ModalUpdateUser } from "../modals/update user";
import {
  ElementProfile,
  LayoutCenterContentTabs,
  LayoutContentTabs,
} from "./items";
import { ButtonCreateItem } from "@/ui/ButtonCreate";
import Link from "next/link";
import { TableLogsEvents } from "../tables/logs events";
import { QuestionSecurity } from "../question security";
import { ListHaciendasProfile } from "../editable sections/hacienda";

type TabsProfileProps = {
  usuarios_veterinarios: UserVeterinaryInfo[];
  veterinarios: veterinario[];
  user: UserLoginInfo;
  haciendaSesion: Hacienda;
  haciendas: Hacienda[];
  configuracion: Configuracion;
  logs_eventos: LogEvento[];
  preguntas_seguridad: PreguntasSeguridad[];
  respuestas_seguridad: RespuestasSeguridad[];
};

const ElementProfileAdmin = ({ user }: { user: UserLoginInfo }) => {
  return (
    <>
      <ElementProfile tittle="Usuario" content={user.usuario} />
      <ElementProfile tittle="Email" content={user.email} />
      <ElementProfile
        tittle="Fecha de creación"
        content={user.fecha_creacion}
      />
    </>
  );
};
const ElementProfileVeterinary = ({ user }: { user: UserLoginInfo }) => {
  return (
    <>
      <ElementProfile tittle="Usuario" content={user.usuario} />
      <ElementProfile tittle="Email" content={user.email} />
      <ElementProfile
        tittle="Fecha de creación"
        content={user.fecha_creacion}
      />
    </>
  );
};

export const TabsProfile = ({
  usuarios_veterinarios,
  veterinarios,
  user,
  haciendaSesion,
  haciendas,
  configuracion,
  logs_eventos,
  preguntas_seguridad,
  respuestas_seguridad,
}: TabsProfileProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Tabs
        aria-label="Options"
        color="primary"
        classNames={{
          tab: "font-bold ",
        }}
        size="lg"
        variant="bordered"
      >
        {/* mi perfil */}
        <Tab key="profile" title="Mi perfil">
          <LayoutContentTabs>
            <div className="flex flex-col">
              <div className="self-end w-48">
                <Button
                  onClick={onOpen}
                  content={
                    <>
                      Editar <IconEditar className={"size-6"} />
                    </>
                  }
                />
              </div>
              {user.rol == "veterinario" && (
                <ElementProfileVeterinary user={user} />
              )}
              {user.rol == "admin" && <ElementProfileAdmin user={user} />}
            </div>
          </LayoutContentTabs>
        </Tab>

        {/* haciendas */}
        <Tab key="haciendas" title="Haciendas">
          <LayoutContentTabs>
            {/* header section */}
            <div className="flex gap-12 items-center">
              <ElementProfile
                tittle="Hacienda en sesión"
                content={haciendaSesion.nombre}
                description="Todos los datos que se representan y las operaciones que se realicen pertenecerán a esta hacienda"
              />
              {/* button registrar hacienda*/}
              {user.rol == "admin" && (
                <ButtonCreateItem href={"/hacienda/registrar"} />
              )}
            </div>

            {/* list haciendas */}
            <div className="flex flex-col mt-8 gap-2">
              <h3 className="font-bold text-2xl pl-4">Haciendas creadas</h3>
              <span className="text-sm opacity-60 pl-4">
                Las haciendas con registros no pueden ser eliminadas
              </span>
              <div className="divider divider-primary mt-0 opacity-[0.03]"></div>{" "}
            </div>
            <ListHaciendasProfile
              haciendaSesion={haciendaSesion}
              haciendas={haciendas}
              userLoginInfo={user}
            />
          </LayoutContentTabs>
        </Tab>

        {/* seguridad */}
        <Tab key="seguridad" title="Seguridad">
          <LayoutContentTabs>
            {/* header section */}
            <div className="flex gap-12 items-center">
              <ElementProfile
                tittle="Preguntas de Seguridad"
                description="Estas preguntas se utilizan para verificar tu identidad en caso de que necesites recuperar tu cuenta. 
                                    Para esto al menos necesitas tener 3 preguntas de seguridad, si no tienes 3 preguntas de seguridad, no podras recuperar tu contraseña"
                divider
              />
            </div>

            <QuestionSecurity
              preguntas_seguridad={preguntas_seguridad}
              respuestas_seguridad={respuestas_seguridad}
            />
          </LayoutContentTabs>
        </Tab>

        {/*  ------------------------------ opciones admin ----------------------------- */}

        {/* tab  configuración */}
        {user.rol == "admin" && (
          <Tab key="setting" title="Configuración">
            <LayoutContentTabs>
              <div className="flex flex-col">
                <div className="self-end w-48">
                  <Link
                    className="btn"
                    title={"Editar configuracion"}
                    href={"/configuracion"}
                  >
                    <IconEditar className={"size-6"} />
                  </Link>
                </div>
                <ElementProfile
                  tittle="Peso apto para un servicio"
                  content={configuracion.peso_servicio.toString()}
                  description="Representa cual sera el peso ideal para que una novilla pueda estar apta para un servicio"
                />
                <ElementProfile
                  tittle="Días próximos para crear una notificación"
                  content={configuracion.dias_evento_notificacion.toString()}
                  description="Representa cuantos días antes de la fecha de un evento, se creara una notificación"
                />
                <ElementProfile
                  tittle="Diferencia entre una vacuna y un plan sanitario"
                  content={configuracion.dias_diferencia_vacuna.toString()}
                  description="Representa cuantos días se podría aplazar la dosis de una vacuna individual para asi estar a la par con el proximo plan sanitario de la misma"
                />
                <div className="flex justify-between w-9/12 items-center ">
                  <div className="flex flex-col gap-2 w-80">
                    <span className="font-bold text-xl">Tipos de revisión</span>
                    <span className="text-sm opacity-60">
                      Estas opciones son las que estarán disponibles a la hora
                      de hacer una revisión, tenga en cuenta que las revisiones
                      creadas no podrán ser eliminadas ademas las revisiones
                      predeterminadas no pueden ser modificadas
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <ButtonCreateItem href={"/revisiones/tipo/crear"} />
                    <ButtonNextUI
                      color="primary"
                      as={Link}
                      href="/revisiones/tipo"
                    >
                      Ver tipos guardados
                    </ButtonNextUI>
                  </div>
                </div>

                <div className="flex justify-between w-9/12 items-center ">
                  <div className="flex flex-col gap-2 w-80">
                    <span className="font-bold text-xl">
                      Vacunas disponibles
                    </span>
                    <span className="text-sm opacity-60">
                      Estas opciones son las que estarán disponibles a la hora
                      crear una plan sanitario ,revision con tratamiento o al
                      registrar una vaca,toro o ganado descarte,
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <ButtonCreateItem href={"/vacuna/registrar"} />
                    <ButtonNextUI color="primary" as={Link} href="/vacuna">
                      Ver vacunas guardadas
                    </ButtonNextUI>
                  </div>
                </div>
              </div>
            </LayoutContentTabs>
          </Tab>
        )}

        {/* tab veterinarios con usuarios */}
        {user.rol == "admin" && (
          <Tab key="user_veterinary" title="Usuarios veterinarios">
            <LayoutCenterContentTabs divider={false}>
              <TableVeterinaryUsers
                usuarios_veterinarios={usuarios_veterinarios}
              />
            </LayoutCenterContentTabs>
          </Tab>
        )}

        {/* tab logs eventos */}
        {user.rol == "admin" && (
          <Tab key="logs_eventos" title="Historial eventos del sistema">
            <LayoutCenterContentTabs divider={false}>
              <TableLogsEvents logs_eventos={logs_eventos} />
            </LayoutCenterContentTabs>
          </Tab>
        )}

        {/* tab crear usuario a veterinario */}
        {user.rol == "admin" && (
          <Tab key="register_user_veterinary" title="Nuevo usuario veterinario">
            <LayoutCenterContentTabs>
              <div className="flex flex-col gap-2 w-64">
                <span className="font-bold text-xl">Veterinarios</span>
                <span className="text-sm opacity-60">
                  Estos veterinarios todavía no cuenta con un usuario, la
                  contraseña por defecto de los usuarios creados será: 123456
                </span>
              </div>
              <SelectVeterinaryNotUser veterinarios={veterinarios} />
            </LayoutCenterContentTabs>
          </Tab>
        )}
      </Tabs>

      <ModalUpdateUser
        id={user.id}
        usuario={user}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};
