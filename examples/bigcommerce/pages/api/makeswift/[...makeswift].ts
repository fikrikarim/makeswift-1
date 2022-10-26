import { MakeswiftApiHandler } from '@makeswift/runtime/next'
import { getConfig } from 'lib/config'

const config = getConfig()
export default MakeswiftApiHandler(config.makeswift.siteApiKey, {
  appOrigin: 'https://app-review-fikri-prd-616.cd.makeswift.com'
})
