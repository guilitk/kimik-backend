import { v4 as getId } from "uuid";
import jwt from "jsonwebtoken";
import KSUID from "ksuid";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAxNQ1DrJBN1uhmEZaJ0PxB3k0rV2u+xSplywd73zdIGgyVucy
3lwA6OKpGJMH2hsSxMmTvveVXbqpacXumFNgstFh52qr7hCttRsWak4LQYK2BL2c
Kef38kyYETZC4AWRXflNHpwoFKdN3uKrE9IH7zMCDof43/c5VJ1/fMH9zElQNK3D
3WZIU9c/afRhMr4UD4o/jQNBdwklRK057wPVJdWp1cPoh89LEwJvG6ZeE4hXCYhK
YS9SXGypPAyRfdY7K3KlJY6R9FUm9mrbRJ/6rhKhEsM97X5tDIgng8bUZ6B4HXmf
yA8Hk90r+2vgiwtBIkJ61yut1KzR6xUWxtP+GQIDAQABAoIBAQCEjHumh/hPNU/f
YhE4PBLG+6Kz1VEPGN0URstqCeZH+qNbzpp9D+w06N8DA5DYGj9LcowioExgMGIC
Lx78Sbnm8gZCd52M1oKEYdd4g1IlLccx7haKSgK5k0cc4DOs9VLtvANpR7PeJMTW
AkM/N8PMG8eYzYyWFsDu8Jl4BJPLy6z4BZ6aW0o/8PzXBtnZjMz5UxS2fzNHrXVi
7cEhI9yS3/5mcnn9hAeBaqjEdziue4isBDRA0+fJhRDiWhbUs3Kf0PeOiVTsdDLM
mS/jHI5+alujNi9oTcVHjwCW0hipoJeMGHP9jhnAKKgDsZgoDIV+90UKrL6+t8Ty
hOFrLSkBAoGBAOCI8MwZgGS1g6zGJtoP5BATGf38c64VyJDXXy0rAP7J3RB/kFR5
MwPFVQ0q5fZLjjozJDmFkfUM5A3yWBi2zqvq+YsYNuHDVrjdsy4HSmwhql30wxJr
CI9gjdoI1otq+LAbw91Kv0kiX0x2M5cD6DZMSqhpluKEtofgPC41DH9xAoGBAOBp
VJb3Yk6DzKAECQNMt0pnVIGX3rggerrHGhOvsSIHTa9mOqEVx6ArqX7DMcOX7J0r
syYGFc2H4vEF3jqIiHxbqBnneLsqzdN5Lh7VzdO4RA4XY5xE0Tn5Nz31hdNOwp6H
bGrg4fStORnoBzRA72K0e6f0/V6IVxEmNBrETGUpAoGBAImuLslYEcyvKNC2qHgq
KlRZAiUlueFTZiq6hZfyuKeDLFTDg8LolomHZQGv/laqOcoiNeI3ryot/2E16yMs
ZUoxyVarQGvrFbBB8W8V9WKcuhTm0v7mNteEAzdhF/1hWKDURaPaA7VaqEkAad39
/VPeMCFYrba0XiCvNPe4e7NhAoGAOXKdZfw0XVceJgSCbibQcSqcloRTTp157aCU
i1+Zn9VwzKsF7UDPFrC2ti2v6ptUxjNurBg4sqHLtdnDtwZGslcgZGk+HePqRu2p
odkn1MBCI71XEaUITqf+vUzCEoMCDWUrmvywu1sw1/HvDjBlV8ZONYPg7LdIWqqG
AigoSmkCgYEAhzgQZUyW5mnxrnikuc3V8YFrYOWrcwp7lspzpSazzi+vSWT7zMBt
Y7s/C6oVYtkS0fTqtJJ2QYrp0Z/veNAwo9IBbHqAdJdHsQTQCIIFjzdKFLOulIyV
I9IEFurY1HSdFC06f9LuuzRb2eMl7WR6owEgOPsrz7coG3SU0fKby0U=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAxNQ1DrJBN1uhmEZaJ0PxB3k0rV2u+xSplywd73zdIGgyVucy3lwA
6OKpGJMH2hsSxMmTvveVXbqpacXumFNgstFh52qr7hCttRsWak4LQYK2BL2cKef3
8kyYETZC4AWRXflNHpwoFKdN3uKrE9IH7zMCDof43/c5VJ1/fMH9zElQNK3D3WZI
U9c/afRhMr4UD4o/jQNBdwklRK057wPVJdWp1cPoh89LEwJvG6ZeE4hXCYhKYS9S
XGypPAyRfdY7K3KlJY6R9FUm9mrbRJ/6rhKhEsM97X5tDIgng8bUZ6B4HXmfyA8H
k90r+2vgiwtBIkJ61yut1KzR6xUWxtP+GQIDAQAB
-----END RSA PUBLIC KEY-----`;

const datetimeAsUTC = Date.parse(new Date().toISOString());

function getBaseTokenPayload(user) {
  return {
    sub: user.username,
    aud: "kimik-frontend",
    iss: "kimik-backend",
    exp: datetimeAsUTC / 1000 + 15 * 60,
    iat: datetimeAsUTC / 1000,
    jti: getId(),
  };
}

function getIdTokenPayload(_user) {
  return {
    ...getBaseTokenPayload(_user),
    user: {
      username: _user.username,
      fullName: _user.name,
      email: _user.email,
    },
  };
}

function getAccessToken(user) {
  return jwt.sign(getBaseTokenPayload(user), privateKey, {
    algorithm: "RS256",
  });
}

function getIdToken(user) {
  return jwt.sign(getIdTokenPayload(user), privateKey, {
    algorithm: "RS256",
  });
}

async function getRefreshToken() {
  return (await KSUID.random()).string;
}

export async function getAuthenticationTokens(user) {
  return {
    accessToken: getAccessToken(user),
    idToken: getIdToken(user),
    refreshToken: await getRefreshToken(),
  };
}
