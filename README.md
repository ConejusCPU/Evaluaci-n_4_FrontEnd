# Proyecto N�4 Front-End

## Descripci�n
Aplicaci�n React + TypeScript creada con Vite para explorar personajes de la API de Dragon Ball desarrollada por Jesús Bernal  Moreira. El proyecto permite buscar personajes, ver detalles completos, agregar favoritos, editar notas locales y conservar datos en Local Storage.

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
5. Para compilar la versi�n de producci�n:
   ```bash
   npm run build
   ```

## Funcionalidades
- Modelo de datos TypeScript con interfaz `Personaje`.
- Consumo de la API de Dragon Ball con `fetch` y validaci�n `response.ok`.
- Estados de React implementados: `personajes`, `cargando`, `error`, `busqueda`, `favoritos` y `viewMode`.
- B�squeda controlada por texto para encontrar personajes por nombre, categor�a o estado.
- Renderizado en lista o tarjetas reutilizables.
- Guardado de favoritos en Local Storage.
- CRUD local en favoritos:
  - Create: agregar personaje a favoritos.
  - Read: cargar y mostrar favoritos guardados.
  - Update: editar notas de favoritos.
  - Delete: eliminar favoritos.
- Manejo de errores y estado de carga.
- Plantillas accesibles con `label`, texto alternativo en im�genes y uso de teclado.

Ejemplo de uso:
- P�gina principal con buscador y tarjetas de personajes.
- Detalle del personaje seleccionado mostrando categor�a, estado, raza, afiliaci�n, potencia/Ki y descripci�n.
- Lista de favoritos con edici�n de notas y eliminaci�n.

## Estructura principal del proyecto
- `src/App.tsx` � l�gica principal y estados.
- `src/components/Buscador.tsx` � componente de b�squeda.
- `src/components/ListaElementos.tsx` � renderizado de lista/tarjetas.
- `src/components/ElementosCard.tsx` � tarjeta de personaje.
- `src/components/Favoritos.tsx` � panel de favoritos con CRUD local.
- `src/services/api.ts` � consumo y transformaci�n de API.
- `src/types/Elemento.ts` � definici�n de tipos TypeScript.

## Notas
- No se incluyen claves privadas en el repositorio.
- El proyecto funciona con React 19, Vite y TypeScript.

---
