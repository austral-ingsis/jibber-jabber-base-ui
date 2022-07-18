import Keycloak from "keycloak-js";

// import Kc from './keycloak.json';


// const keycloak = new Keycloak({
//     url: "https://jbbrjbbr2202.store/auth/",
//     realm: "JibberJabber",
//     clientId: "JibberJabber-frontend",
//     // sslRequired: "external",
//     // resource: "JibberJabber-frontend",
//     // public-client: true,
//     // confidential-port: 0
// });

const keycloak = new Keycloak('/keycloak.json')


export default keycloak;