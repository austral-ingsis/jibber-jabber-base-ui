import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8087/auth",
    realm: "JibberJabber",
    clientId: "JibberJabber-frontend"
});


export default keycloak;