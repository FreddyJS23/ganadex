export const endPoints = {
    ganado: 'ganado/',
    todosGanado: 'ganado',
    toro: 'toro/',
    pajuelaToro: 'pajuela_toros/',
    crearUsuario: 'register',
    todosToro: 'toro',
    todosGanadoDescarte: 'ganado_descarte',
    descartarGanado: 'descartar_ganado/',
    ganadoDescarte: 'ganado_descarte/',
    /* criasNumeracion: 'crias_pendiente_numeracion', */
    asignarNumeroCria: 'asignar_numero_cria/',
    /* criasCapar: 'crias_pendiente_capar', */
    /* caparCria: 'capar_cria/', */
    crearPrecioLeche: 'precio/',
    preciosLeche: 'precio',
    checkSessionApi: 'check_session_activa',
    ventasLeche: 'venta_leche',
   /*  insumo: 'insumo/',
    insumos: 'insumo', */
    planesSanitario: 'plan_sanitario',
    personal: 'personal/',
    todosPersonal: 'personal',
    veterinariosDisponibles: 'veterinarios',
    comprador: 'comprador/',
    compradores: 'comprador',
    ventaGanado: 'ventas/',
    ventasGanado: 'ventas',
    fallecimiento: 'fallecimientos/',
    fallecimientos: 'fallecimientos',
    revisiones: 'revisiones',
    servicios: 'servicios',
    partos: 'partos',
    pesajesLeche: 'pesaje_leche',
    cargosPersonal: 'cargos_personal',
    añosVentaGanado: 'años_ventas_ganado',
    añosProduccionLeche: 'años_produccion_leche',
    dashboardPrincipaltotalGanadoTipo: 'dashboard_principal/total_ganado_tipo',
    dashboardPrincipaltotalPersonal: 'dashboard_principal/total_personal',
    dashboardPrincipalvacasGestacion: 'dashboard_principal/vacas_gestacion',
    dashboardPrincipalvacasProductoras: 'dashboard_principal/vacas_productoras',
    dashboardPrincipalvacasMenosProductoras:
        'dashboard_principal/vacas_menos_productoras',
    dashboardPrincipalpendienteRevision:
        'dashboard_principal/ganado_pendiente_revision',
    dashboardPrincipalcantidadNovillasMontar:
        'dashboard_principal/cantidad_novillas_montar',
    dashboardPrincipalinsumoMenorExistencia: 'dashboard_principal/menor_insumo',
    dashboardPrincipalinsumoMayorExistencia: 'dashboard_principal/mayor_insumo',
    dashboardPrincipalbalanceAnualLeche:
        'dashboard_principal/balance_anual_leche',
    dashboardVentaLecheprecioActual: 'dashboard_venta_leche/precio_actual',
    dashboardVentaLechevariacionPRecio:
        'dashboard_venta_leche/variacion_precio',
    dashboardVentaLechegananciasDelMes: 'dashboard_venta_leche/ganancias_mes',
    dashboardVentaLecheventasMesLeche: 'dashboard_venta_leche/ventas_mes',
    dashboardVentaLecheBalanceMensual: 'dashboard_venta_leche/balance_mensual',
    dashboardVentaGanadomejorComprador:
        'dashboard_venta_ganado/mejor_comprador',
    dashboardVentaGanadomejorVenta: 'dashboard_venta_ganado/mejor_venta',
    dashboardVentaGanadopeorVenta: 'dashboard_venta_ganado/peor_venta',
    dashboardVentaGanadoventasMesGanado: 'dashboard_venta_ganado/venta_mes',
    dashboardVentaGanadoBalanceAnual: 'dashboard_venta_ganado/balance_anual',
    dashboardFallecimientosCausasFrecuentes:
        'dashboard_fallecimientos/causas_frecuentes',
    dashboarPlanesSanitarioProximosPlanes:'dashboard_planes_sanitario/proximos_planes_sanitario',
    notificaciones: 'notificaciones',
    eliminarNotificacion: 'notificaciones/',
    eliminarTodasNotificaciiones:'borrar_notificaciones',
    fechaUltimoRespaldo: 'ultimo_respaldo',
    vacunasDisponibles: 'vacunas_disponibles',
    sugerirNumero:'numero_disponible',
    veterinariosSinUsuario: 'veterinarios_sin_usuario',
    usuariosVeterinarios:'usuarios_veterinarios',
    usuarioVeterinario: 'usuarios_veterinarios/',
    usuario:'usuario/',
    hacienda:'hacienda',
    verSesionHacienda:'verificar_sesion_hacienda',
    crearSesionHacienda:'crear_sesion_hacienda/',
    logsVeterinario:'logs_veterinario/',
    actualizarConfig:'configuracion/',
    resumenNatalidad:'resumen_natalidad?year=',
    logsEventos:'logs_eventos',
    tiposRevision:'tipos_revision',
    tipoRevision:'tipos_revision/',
    causasFallecimiento:'causas_fallecimiento',
    causaFallecimiento:'causas_fallecimiento/',
};

export const endPointsCattle = {
    revision: '/revision/',
    revisiones: '/revision',
    servicio: '/servicio/',
    servicios: '/servicio',
    parto: '/parto/',
    partos: '/parto',
    pesajeLeche: '/pesaje_leche/',
    pesajesLeche: '/pesaje_leche',
};

/**Rutas para el endpoint de laravel   */
export const endpointsReports = {
    venta_leche: 'reportes/venta_leche',
    fallecimiento: 'reportes/causas_fallecimientos',
    dashboard: 'reportes/general',
    ganado: 'reportes/ganado',
    notaVenta: 'reportes/nota_venta',
};
/**Rutas para el endpoint de laravel   */
export const endpointsReportsAnnual = {
    venta_ganado: 'reportes/venta_ganado',
    natalidad:'reportes/natalidad',

};
