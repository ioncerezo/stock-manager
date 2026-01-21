📄 EXAMEN SIMULACRO NIVEL 2: "Gestor de Stock E-commerce"

Tiempo: 2 Horas (Estricto) API: https://dummyjson.com/products Objetivo: CRUD completo + Lógica de negocio en el cliente + Manipulación visual del DOM.
🛑 Requisitos Previos (Indispensables)

    Proyecto NO STANDALONE (ng new stock-manager --no-standalone).

    Uso de Bootstrap 5 (CDN).

    Prohibido: IA, Copilot, Repos antiguos.

1. Arquitectura y Enrutamiento (20 min)

Configura las siguientes rutas en app-routing.module.ts. Fíjate que incluimos rutas parametrizadas para ver detalle y para editar.

    '' (vacío) -> Redirige a /productos

    /productos -> ProductListComponent (Listado principal)

    /producto/:id -> ProductDetailComponent (Vista de detalle único)

    /gestionar -> ProductFormComponent (Formulario para CREAR)

    /gestionar/:id -> ProductFormComponent (El MISMO componente para EDITAR)

    ** -> NotFoundComponent (Una página simple de error 404)

    Reto de Arquitectura: Tienes que usar el mismo componente de formulario para crear y editar. Tendrás que detectar si la ruta trae un id o no.

2. Servicio HTTP Completo (REST) (20 min)

Crea el servicio ProductService con los 5 métodos sagrados del REST. URL Base: https://dummyjson.com/products

    GET All: getProducts() -> Devuelve el listado (/products).

    GET One: getProductById(id) -> Devuelve uno solo (/products/id).

    POST: createProduct(data) -> Crea (/products/add). Ojo: DummyJSON requiere que la URL termine en /add para simular creación.

    PUT: updateProduct(id, data) -> Actualiza (/products/id).

    DELETE: deleteProduct(id) -> Borra (/products/id).

3. DOM Avanzado y Listado (30 min)

En ProductListComponent, consume el servicio y pinta los productos. Requisitos de DOM y Lógica Visual:

    Feedback de Stock (ngIf/ngClass):

        La API devuelve un campo stock.

        Si stock < 10, muestra una etiqueta roja que diga "¡Últimas unidades!".

        Si stock >= 10, muestra una etiqueta verde que diga "En Stock".

    Estilo de Precio Dinámico (ngStyle):

        Si el precio es mayor a 500€, el texto del precio debe salir en color rojo y negrita.

        Si es menor, en color normal.

    Cálculo en Tiempo Real:

        Al final de la lista, muestra un texto que diga: "Valor total del inventario en pantalla: X €".

        Debes sumar el precio de todos los productos cargados y mostrarlo.

    Buscador Local (Filter):

        Añade un <input> encima de la lista.

        Al escribir, la lista debe filtrarse en tiempo real por el nombre del producto (sin llamar a la API, filtrando el array en local).

4. Formulario Inteligente (Create & Update) (30 min)

Aquí está la clave del examen. En ProductFormComponent:

    Detección de Modo:

        En el ngOnInit, usa ActivatedRoute para ver si hay un parámetro id.

        Si hay ID: Estás en modo EDICIÓN. Llama al servicio getProductById(id), rellena el formulario con los datos y cambia el título de la página a "Editar Producto".

        Si NO hay ID: Estás en modo CREACIÓN. El formulario empieza vacío y el título es "Nuevo Producto".

    Validación:

        Título: Obligatorio.

        Precio: Obligatorio y mayor que 0.

    Acción del Botón Guardar:

        Si es Edición -> Llama a updateProduct().

        Si es Creación -> Llama a createProduct().

        En ambos casos, al terminar, redirige a /productos.

5. Detalle y Borrado (10 min)

En ProductDetailComponent:

    Muestra la foto en grande (thumbnail o images[0]), la descripción completa y la categoría.

    Añade un botón "Eliminar Producto".

    Al pulsar, lanza un confirm() de Javascript nativo ("¿Estás seguro?"). Si dice sí, llama al servicio delete y redirige al listado.

6. Despliegue (10 min)

    Sube a GitHub.

    Despliega en GitHub Pages (recuerda useHash: true en el routing module si te da problemas de 404).