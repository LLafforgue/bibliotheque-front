declare module "*.svg" {
  import * as React from "react";

  // pour `import { ReactComponent as Icon } from './icon.svg'`
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // pour `import logo from './logo.svg'`
  const src: string;
  export default src;
}
