'use client';

import { Tab, Tabs, useDisclosure } from '@nextui-org/react';
import { TableVeterinaryUsers } from '../tables/veterinary users';
import { SelectVeterinaryNotUser } from '../select veterenary not user';
import { Finca, UserAdminInfo, UserVeterinaryInfo, veterinario } from '@/types';
import { Button } from '@/ui/Button';
import IconEditar from '@/icons/icono-editar.svg';
import { ModalUpdateUser } from '../modals/update user';
import {
    ElementProfile,
    LayoutCenterContentTabs,
    LayoutContentTabs,
} from './items';
import { ButtonCreateItem } from '@/ui/ButtonCreate';

type TabsProfileProps = {
    usuarios_veterinarios: UserVeterinaryInfo[];
    veterinarios: veterinario[];
    user: UserVeterinaryInfo | UserAdminInfo;
    finca:Pick<Finca,'id'|'nombre'>
};

const ElementProfileAdmin = ({ user }: { user: UserAdminInfo }) => {
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
const ElementProfileVeterinary = ({ user }: { user: UserVeterinaryInfo }) => {
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
    finca
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
                disabledKeys={['setting']}
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

                {/* tab desactivado configuracion */}
                <Tab key="setting" title="Configuracion">
                    <div>Configuracion</div>
                </Tab>
    
    {/*  ------------------------------ opciones admin ----------------------------- */ }
              
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
                                    content={finca.nombre}
                                    description="Todos los datos que se representan y las operaciones que se realizen perteneceran a esta finca"
                                />
                                {/* button */}
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
                                {user.fincas.map(
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
