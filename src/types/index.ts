export interface Schema{
  data_type: File,
  display_name: string,
  uid: string,
  mandatory: Boolean
}

export interface ContentType {
  title: string;
  uid: string;
  schema: Schema[]
  [key: string]: unknown;
}

export type ComponentItemType = {
  id: number
}

export type CanvasComponent = {
  id: number,
  name: string, 
  type: string
}
