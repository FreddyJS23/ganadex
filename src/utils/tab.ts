export function tabProps(index: number) {
    return {
        id: `notification-tabContent-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

