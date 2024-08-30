namespace React {
  export interface CSSProperties extends CSS.Properties<string | number> {
    "--value"?: string | number;
    "--size"?: string | number;
    "--thickness"?: string | number;
  }
}
