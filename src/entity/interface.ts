export interface Device {
  name: string,
  alias: string,
  icon:string,
  state:string,
  dimmable:boolean,
  online:boolean,
  processing?:boolean
} 
