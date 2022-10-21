# Laboratorio para uso de Cognito

![Cognito](https://www.solodev.com/file/2f5b95bd-b20c-11ea-904e-0eb0590535cd/Amazon_Cognito_Icon-b7c2579c.jpg)

### Este es un laboratorio para entender como funcionan nos integramos con este servicio de AWS. Cognito es un servicio de administración de control de acceso e inicio de sesión. Con esto, podemos combinar varios tipos de sesión (OIDC, SAML, FBA). Este demo apunta a utilizar Cognito para estas configuraciones.

Para integrarnos, debemos usar la librería `aws-amplify` y `aws-sdk`

Deben crear un archivo .env

```bash
HTTPS=true
API_URL=https://localhost:{puerto-local}
API_CONTROLLER=/api/customer
AWS_COGNITO_REDIRECTSIGNIN=http://localhost:3000
AWS_COGNITO_REDIRECTSIGNOUT=http://localhost:3000/signin
AWS_COGNITO_DOMAN={domain}.auth.us-east-1.amazoncognito.com
AWS_REGION={region}
AWS_USER_POOL={pool}
AWS_POOL_WEB_CLIENTID={clientid}
```

- [App.tsx](src/App.tsx): en este archivo se configura la autenticación con cognito

```javascript
AWS.config.region = region;
Amplify.configure({
  Auth: {
    //identityPoolId: "us-east-xxxxx" // OPTIONAL - Amazon Cognito Identity Pool ID
    region: region, // REQUIRED - Amazon Cognito Region
    userPoolId: userPoolId, // REQUIRED - Amazon Cognito User Pool ID
    userPoolWebClientId: userPoolWebClientId, // OPTIONAL - Amazon Cognito Web Client ID
    oauth: {
      domain: domain,
      scope: [
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      redirectSignIn: signInUrl,
      redirectSignOut: signOutUrl,
      responseType: "token"
    }
  }
});
```
- [Admin.tsx](src/components/Admin.tsx): Contene un formulario de ejemplo para hacer pruebas de carga hacia RabbitMQ. Este componente se muestra solo si estás logueado a la aplicación.
- [Login.tsx](src/security/Login.tsx): Es el componente que tiene el botón para ir al proveedor de autenticación de Cognito.
- [ProtectedRoute.tsx](src/security/ProtectedRoute.tsx): Es un componente que funciona como Wrapper para los componentes que deben ser visualizados si estás logueado. Se implementa en el [App.tsx](src/App.tsx)
```javascript
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={Admin} />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#
## *Backend de carga de archivos*
El proyecto de backend para ejecutar este laboratorio lo pueden encontrar en este link: [Queues.Rabbit.Learning](https://github.com/chelobone/rabbitmqdemo)

#