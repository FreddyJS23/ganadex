'use client'
import { useState } from "react";
import { NotificationBody } from "./item";
import { Tab, Tabs } from "@mui/material";
import { TabContent } from "@/ui/TabContent";
import { tabProps } from "@/utils";

export const NotificationMain = () => {
   
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <div
      tabIndex={0}
      className="mt-3 p-4  dropdown-content w-72 sm:w-auto bg-base-100"
    >
      {/*  cabezera */}
      <div className="flex items-center justify-between">
        <h4 className="  sm:text-xl  font-bold">Notificaciones</h4>
        <p className="text-sm sm:text-base">Omitir todo</p>
      </div>

      {/* secciones */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs notification"
        variant="scrollable"
        allowScrollButtonsMobile
        classes={{indicator:'!bg-primary'}}
        textColor="inherit"
      >
        <Tab label="General" className="text-xs sm:text-sm" {...tabProps(0)} />
        <Tab label="Revisiones" className="text-xs sm:text-sm" {...tabProps(1)} />
        <Tab label="Partos" className="text-xs sm:text-sm" {...tabProps(2)} />
        <Tab label="Secado" className="text-xs sm:text-sm" {...tabProps(3)} />
      </Tabs>

      {/*  cuerpo */}
      {/*  tab general */}
      <TabContent value={value} index={0} section="notification" >
        <NotificationBody
          date="12-12-2020"
          id={3}
          numberCattle={342}
          type="birth"
        />
      </TabContent>

      {/*  tab revision */}
      <TabContent value={value} index={1} section="notification" >
        <NotificationBody
          date="12-12-2020"
          id={3}
          numberCattle={342}
          type="birth"
        />
      </TabContent>

      {/*  tab parto */}
      <TabContent value={value} index={2} section="notification" >
        <NotificationBody
          date="12-12-2020"
          id={3}
          numberCattle={342}
          type="birth"
        />
      </TabContent>

      {/*  tab secado */}
      <TabContent value={value} index={3} section="notification" >
        <NotificationBody
          date="12-12-2020"
          id={3}
          numberCattle={342}
          type="birth"
        />
      </TabContent>
    </div>
  );
}



