export type ComponentType = 'heading' | 'subheading' | 'image' | 'textbox';

export interface DraggableComponent {
  id: number;
  type: ComponentType;
  content: string;
  styles: React.CSSProperties;
}

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

