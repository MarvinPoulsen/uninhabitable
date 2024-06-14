const statusOptionsParam = '[uninhabitable.statusOptions]';
const statusOptionsDev = 'Startet;Afventer;Mangler;I gang';
console.log('statusOptionsParam: ',statusOptionsParam)
export const statusOptions = statusOptionsParam.includes('[') ? statusOptionsDev.split(";") : statusOptionsParam.split(";");
