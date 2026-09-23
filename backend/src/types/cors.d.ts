declare module 'cors' {
  import type { RequestHandler } from 'express'

  interface CorsOptions {
    origin?: boolean | string | RegExp | Array<boolean | string | RegExp>
    methods?: string | string[]
    allowedHeaders?: string | string[]
    exposedHeaders?: string | string[]
    credentials?: boolean
    maxAge?: number
  }

  export default function cors(options?: CorsOptions): RequestHandler
}
