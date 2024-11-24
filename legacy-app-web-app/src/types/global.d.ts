declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

interface Window {
  ethereum?: any;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
