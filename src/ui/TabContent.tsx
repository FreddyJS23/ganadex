/* Contenido de un tab */
 type TabContentProps = {
   /** Componente que tendra el tap */
    children?: React.ReactNode;
   /** Identificador del tab */
    index: number;
   /** Valor del tab para identificar cuando este selecinado */
    value: number;
 /**  Sección al que corresponde el tab */
    section:'notification'
}

export const TabContent = ({ children, value, index,section }: TabContentProps) => {
  return (
    <div
      role="tabContent"
      hidden={value !== index}
      id={`${section}-tabContent-${index}`}
      aria-labelledby={`${section}-tabContent-${index}`}
    >
      {value === index && children}
    </div>
  );
};
