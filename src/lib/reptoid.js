import Reptoid from '@reptoid/codebases'

const reptoid = new Reptoid({
    apiHost: 'http://localhost:3010',
    accessToken: process.env.REPTOID_ACCESS_TOKEN
})

export default reptoid
        
