declare module 'jwt-encode' {
  function encode(payload: any, secret: string, options?: any): string;
  export = encode;
}
