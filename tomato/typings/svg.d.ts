declare module "*.svg?url";
declare module "*.svg" {
  const SVGFC: React.FC<React.SVGProps<SVGSVGElement>>;

  export default SVGFC;
}
