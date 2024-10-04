export type ComponentType = 'heading' | 'subheading' | 'image' | 'textbox';

export interface DraggableComponent {
  id: number;
  type: ComponentType;
  content: string;
  styles: React.CSSProperties;
}

export interface ContentType {
  title: string;
  uid: string;
  [key: string]: unknown;
}

