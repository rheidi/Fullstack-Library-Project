import { Config } from './types/Config'

const config: Config = {
  backendUrl: 'https://home-library-management-application.azurewebsites.net/api/v1'
}

const devConfig: Config = {
  backendUrl: 'http://localhost:5068/api/v1'
}

export default process.env.NODE_ENV === 'development' ? devConfig : config
