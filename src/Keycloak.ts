import Keycloak from "keycloak-js";

// import Kc from './keycloak.json';


const keycloak = new Keycloak({
    url: "http://jbbrjbbr2202.store/auth",
    realm: "JibberJabber",
    clientId: "JibberJabber-frontend"
});

// const keycloak = new Keycloak(Kc)


export default keycloak;