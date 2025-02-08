'use client';

import { Tab, Tabs, useDisclosure } from '@nextui-org/react';
import { TableVeterinaryUsers } from '../tables/veterinary users';
import { SelectVeterinaryNotUser } from '../select veterenary not user';
import { Configuracion, Finca, UserLoginInfo, UserVeterinaryInfo, veterinario } from '@/types';
import { Button } from '@/ui/Button';
import IconEditar from '@/icons/icono-editar.svg';
import { ModalUpdateUser } from '../modals/update user';
import {
    ElementProfile,
    LayoutCenterContentTabs,
    LayoutContentTabs,
} from './items';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import Link from 'next/link';

type TabsProfileProps = {
    usuarios_veterinarios: UserVeterinaryInfo[];
    veterinarios: veterinario[];
    user: UserLoginInfo;
    fincaSesion:Finca
    fincas:Finca[]
    configuracion:Configuracion
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
    fincaSesion,
    fincas,
    configuracion
}: TabsProfileProps) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <Tabs
                aria-label="Options"
                color="primary"
                classNames={{
                    tab: 'font-bold ',
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
                                            Editar{' '}
                                            <IconEditar className={'size-6'} />
                                        </>
                                    }
                                />
                            </div>
                            {user.rol == 'veterinario' && (
                                <ElementProfileVeterinary user={user} />
                            )}
                            {user.rol == 'admin' && (
                                <ElementProfileAdmin user={user} />
                            )}
                        </div>
                    </LayoutContentTabs>
                </Tab>

    
    {/*  ------------------------------ opciones admin ----------------------------- */ }
              
                 {/* tab desactivado configuracion */}
                {user.rol == 'admin' && ( <Tab key="setting" title="Configuracion">
                <LayoutContentTabs>
                        <div className="flex flex-col">
                            <div className="self-end w-48">
                                <Link className='btn' title={'Editar configuracion'} href={'/configuracion'}>
                                <IconEditar className={'size-6'} />
                                </Link>
                            </div>
                          <ElementProfile
                            tittle="Peso apta para un servicio"
                            content={configuracion.peso_servicio.toString()}
                            description="Representa cual sera el peso ideal para que una novilla pueda estar apta para un servicio"
                        />
                          <ElementProfile
                            tittle="Dias prximos para crear una notificacion"
                            content={configuracion.dias_evento_notificacion.toString()}
                            description="Representa cuantos dias antes de la fecha de un evento, se creara una notificacion"
                        />
                          <ElementProfile
                            tittle="Diferencia entre una vacuna y una jornada de vacunacion"
                            content={configuracion.dias_diferencia_vacuna.toString()}
                            description="Representa cuantos dias se podria aplazar la dosis de una vacuna individual para asi estar a la par con la proxima jornada de vacunacion de la misma"
                        />
                        </div>
                    </LayoutContentTabs>
                </Tab>)}
                
                {/* tab veterinarios con usuarios */}
                {user.rol == 'admin' && (
                    <Tab key="user_veterinary" title="Usuarios veterinarios">
                        <LayoutCenterContentTabs divider={false}>
                            <TableVeterinaryUsers
                                usuarios_veterinarios={usuarios_veterinarios}
                            />
                        </LayoutCenterContentTabs>
                    </Tab>
                )}

                {/* tab crear usuario a veterinario */}
                {user.rol == 'admin' && (
                    <Tab
                        key="register_user_veterinary"
                        title="Nuevo usuario veterinario"
                    >
                        <LayoutCenterContentTabs>
                            <div className="flex flex-col gap-2 w-64">
                                <span className="font-bold text-xl">
                                    Veterinarios
                                </span>
                                <span className="text-sm opacity-60">
                                    Estos veterinarios todavia no cuenta con un
                                    usuario, la contraseña por defecto de los usuarios creados 
                                    sera: 123456
                                </span>
                            </div>
                            <SelectVeterinaryNotUser
                                veterinarios={veterinarios}
                            />
                        </LayoutCenterContentTabs>
                    </Tab>
                )}

                {/* fincas */}
                {user.rol == 'admin' && (
                    <Tab key="fincas" title="Fincas">
                        <LayoutContentTabs>
                            {/* header section */}
                            <div className="flex gap-12 items-center">
                                <ElementProfile
                                    tittle="Finca en sesion"
                                    content={fincaSesion.nombre}
                                    description="Todos los datos que se representan y las operaciones que se realizen perteneceran a esta finca"
                                />
                                {/* button registrat finca*/}
                                    <ButtonCreateItem
                                        href={'/finca/registrar'}
                                    />
                            </div>
                           
                            {/* list fincas */}
                            <div className="flex flex-col mt-8 gap-2">
                                <h3 className="font-bold text-2xl pl-4">
                                    Fincas creadas
                                </h3>
                                <div className="divider divider-primary mt-0 opacity-[0.03]"></div>{' '}
                            </div>
                            <>
                                {fincas.map(
                                    ({ id, nombre, fecha_creacion }) => (
                                        <ElementProfile
                                            key={id}
                                            tittle={nombre}
                                            description={`Creada el ${fecha_creacion}`}
                                        />
                                    ),
                                )}
                            </>
                        </LayoutContentTabs>
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
