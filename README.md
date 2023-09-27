# TODO
/ validar que la carga de un archivo sea una simagen base64 en auth
  const imageValue = watch('image')

  useEffect(() => {
    const isBase64 = isBase64Image(imageValue)
    if (!isBase64) {
      setValue('image', '')
      setImageError('File must be an image')
      const timeout = setTimeout(() => {
        setImageError('')
      }, 3000);
      clearTimeout(timeout)
    }
  }, [imageValue])


/ Hacer que al update profile pasale el user id en vez de usar la funcion getuser


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
