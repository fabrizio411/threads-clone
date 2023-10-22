# TODO
/ validar que la carga de un archivo sea una simagen base64 en auth

/ Hacer que al update profile pasale el user id en vez de usar la funcion getuser

/hide likes count option thi

s
# DOCUMENTACION
Aplicación clon de Threads.
Se intenta asemejar lo más posible a la aplicación real. Copiando los diseños y la mayoria de funcionalidades de la misma.
No va a incluir: 
- Subir tipo de archivo que no sea imagen base64.

## Páginas
### Auth Page: 
- Una página para login y otra para registro. Utilizan el mismo componente de formulario, que renderiza el contenido dependiendo de la página.
- Login realizado con NextAuth.
- Incluye validaciones de datos reactivas.
- Al hacer el registro se despliega un modulo para ingresar mas datos, que estarán incluidos en el mismo formulario.
-
