export type Config = {
  bigcommerce: {
    storeUrl: string
    storeApiUrl: string
    accessToken: string
    allowedCorsOrigins: string[]
  }
  makeswift: {
    siteApiKey: string
    productTemplatePathname: string
  }
}

function getEnvVarOrThrow(key: string): string {
  const value = process.env[key]

  if (!value) throw new Error(`"${key}" env var is not defined.`)

  return value
}

export function getConfig(): Config {
  return {
    bigcommerce: {
      accessToken: getEnvVarOrThrow('BIGCOMMERCE_STORE_API_TOKEN'),
      storeApiUrl: getEnvVarOrThrow('BIGCOMMERCE_STORE_API_URL'),
      storeUrl: getEnvVarOrThrow('BIGCOMMERCE_STOREFRONT_API_URL'),
      allowedCorsOrigins:
        process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
          ? [new URL(`https://${getEnvVarOrThrow('VERCEL_URL')}`).origin]
          : [],
    },
    makeswift: {
      siteApiKey: getEnvVarOrThrow('MAKESWIFT_SITE_API_KEY'),
      productTemplatePathname: '/__product__',
    },
  }
}
