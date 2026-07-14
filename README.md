# Proyecto N°4 Front-End

## Descripción
Aplicación React + TypeScript creada con Vite para explorar personajes de la API de Dragon Ball desarrollada por Jesús Bernal  Moreira. El proyecto permite buscar personajes, ver detalles completos, agregar favoritos, editar notas locales y conservar datos en Local Storage.

## API utilizada
- API: `https://dragonball-api.com/api/characters`
- El proyecto utiliza `fetch` con `async/await` y valida `response.ok`.
- Los datos recibidos se transforman para adaptarse al modelo interno del proyecto.

## Instalaci�n
1. Clona o descarga el repositorio (https://github.com/ConejusCPU/Evaluaci-n_4_FrontEnd).
2. Abre la carpeta del proyecto.
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Ejecuta la app en modo desarrollo:
   ```bash
   npm run dev
   ```
5. Para compilar la versión de producción:
   ```bash
   npm run build
   ```

## Funcionalidades
- Modelo de datos TypeScript con interfaz `Personaje`.
- Consumo de la API de Dragon Ball con `fetch` y validación `response.ok`.
- Estados de React implementados: `personajes`, `cargando`, `error`, `busqueda`, `favoritos` y `viewMode`.
- Búsqueda controlada por texto para encontrar personajes por nombre, categoría o estado.
- Renderizado en lista o tarjetas reutilizables.
- Guardado de favoritos en Local Storage.
- CRUD local en favoritos:
  - Create: agregar personaje a favoritos.
  - Read: cargar y mostrar favoritos guardados.
  - Update: editar notas de favoritos.
  - Delete: eliminar favoritos.
- Manejo de errores y estado de carga.
- Plantillas accesibles con `label`, texto alternativo en imágenes y uso de teclado.

Ejemplo de uso:
- Página principal con buscador y tarjetas de personajes.
- Detalle del personaje seleccionado mostrando categoría, estado, raza, afiliación, potencia/Ki y descripción.
- Lista de favoritos con edición de notas y eliminación.

## Estructura principal del proyecto
- `src/App.tsx` lógica principal y estados.
- `src/components/Buscador.tsx`  componente de búsqueda.
- `src/components/ListaElementos.tsx`  renderizado de lista/tarjetas.
- `src/components/ElementosCard.tsx` tarjeta de personaje.
- `src/components/Favoritos.tsx`  panel de favoritos con CRUD local.
- `src/services/api.ts` consumo y transformación de API.
- `src/types/Elemento.ts` definición de tipos TypeScript.

## Notas
- No se incluyen claves privadas en el repositorio.
- El proyecto funciona con React 19, Vite y TypeScript.

---
