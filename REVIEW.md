# Instrucciones de revisión para Kilo Code

## Contexto verificable del proyecto

Pulso está pasando de planificación a implementación. La arquitectura objetivo se documenta en la [Wiki](https://github.com/Fernanda-Escobar-Fullstack/pulso/wiki) y en `docs/architecture.md`. No presentes tecnologías planificadas como implementadas ni inventes versiones, comandos, módulos o garantías que el diff y la rama revisada no demuestren.

El objetivo es una aplicación web para pequeños negocios de alimentos. El diseño previsto es un monorepositorio TypeScript con frontend React + Vite, backend NestJS por capas, REST, PostgreSQL/TypeORM, JWT y Google OAuth, Gemini mediante el backend y Web Speech API en el navegador. Considera implementado únicamente lo que exista y pueda verificarse en la rama revisada.

## Comportamiento obligatorio del revisor

- Responde siempre en español.
- Revisa el diff en contexto y reporta únicamente problemas introducidos o agravados por el cambio.
- Prioriza seguridad, aislamiento entre negocios, integridad de dinero e inventario, autorización, transacciones y regresiones funcionales.
- Comprueba cada hallazgo contra el código, pruebas, configuración, `docs/architecture.md` y la Wiki. Si falta evidencia, formula una pregunta o no reportes el hallazgo.
- No afirmes que lint, pruebas, build, migraciones o despliegue pasan si no se ejecutaron y no existe resultado verificable.
- No exijas una tecnología, versión o abstracción que el proyecto no haya adoptado.
- No conviertas preferencias cosméticas en hallazgos. No solicites refactors sin un riesgo concreto.
- Agrupa duplicados por causa raíz. Evita falsos positivos e hipótesis sin una ruta de fallo demostrable.
- Señala contradicciones entre código y documentación, pero distingue un defecto ejecutable de una decisión aún pendiente.

## Prioridad 1: seguridad y aislamiento

### Autenticación y autorización

- Toda ruta protegida debe autenticar en el backend y aplicar autorización por rol; ocultar botones en React no concede ni revoca permisos.
- `Administrator` y `Employee` no son equivalentes. Comprueba especialmente gestión de empleados, costos de referencia, salarios, costos, utilidades y resultados financieros.
- Verifica estado activo del usuario y expiración/validez del JWT cuando esos mecanismos existan.
- En Google OAuth, Google prueba identidad; Pulso todavía debe resolver usuario, negocio, rol y estado. Nunca aceptes rol o `businessId` desde el cliente o desde claims no verificados.
- AI y voz deben usar exactamente los mismos controles que una operación iniciada desde un formulario.

### Aislamiento por negocio

- Todo registro operativo pertenece a un negocio. El `businessId` autorizado se obtiene de la identidad autenticada, nunca de parámetros, body, query o headers controlados por el cliente.
- Toda lectura y mutación por UUID debe incluir el alcance del negocio. Verifica también relaciones, agregados, conteos, búsquedas, exports, alertas y mensajes de error.
- Detecta IDOR: cargar primero por ID y comprobar el negocio después puede filtrar existencia o permitir cambios. Prefiere una consulta ya limitada por `id` y `businessId`.
- En creación y asociación de registros, confirma que todas las entidades relacionadas pertenecen al mismo negocio.
- Las pruebas de autorización importantes deben usar al menos dos negocios y cubrir lectura y escritura cruzadas.

### Entrada, secretos y exposición

- DTOs y validación del servidor deben comprobar tipos, UUID, enum, fechas, unidades, cantidades y dinero, rechazar campos inesperados y no confiar en validación del frontend.
- Reporta SQL construido con entrada no confiable, consultas sin parametrizar o uso inseguro de operadores dinámicos.
- Contraseñas deben almacenarse con bcrypt; nunca deben aparecer contraseñas, hashes, JWT, tokens de Google, cabeceras de autorización, `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_SECRET` ni `GEMINI_API_KEY` en código, bundle, respuesta o log.
- Una variable `VITE_*` es pública. Reporta cualquier secreto expuesto con ese prefijo o incorporado al frontend.
- CORS solo limita orígenes del navegador; nunca lo aceptes como sustituto de autenticación o autorización.
- Revisa límites de abuso en login y endpoints costosos de IA cuando su implementación entre en alcance. No inventes valores de límites aún no decididos.

### Gemini e IA

- Gemini solo recibe contexto mínimo que el usuario ya puede consultar. Reporta contexto de otro negocio, datos salariales/financieros no autorizados, objetos completos innecesarios o credenciales.
- La IA no ejecuta SQL, accede directamente a PostgreSQL, calcula valores financieros oficiales ni persiste cambios.
- Una propuesta de IA o voz requiere vista previa y confirmación explícita. La confirmación debe repetir autenticación, autorización, ownership, validación y reglas; no debe confiar en un payload propuesto anteriormente sin protegerlo contra manipulación o caducidad.
- Las instrucciones del usuario o la salida del modelo no pueden alterar permisos, selección de herramientas ni reglas de negocio.
- Los fallos del proveedor no deben bloquear compras, ventas, inventario u otras funciones principales.

## Prioridad 2: bugs, reglas e integridad de datos

Contrasta cambios con los requisitos y reglas `BR-001` a `BR-030` de la Wiki. Revisa especialmente:

- cantidades estrictamente mayores que cero y precios mayores o iguales a cero;
- solo `kg ↔ g` y `L ↔ ml`; una unidad no se convierte a peso o volumen;
- fechas reales de compras, ventas, gastos, conteos y mermas no pueden estar en el futuro;
- receta `Draft → Active → Archived`; una receta activa requiere ingredientes válidos;
- un producto preparado exige receta activa; un producto de reventa no;
- registros archivados no se usan en nuevas operaciones y los historiales no se eliminan;
- costo de receta = suma de ingredientes convertidos; costo unitario = costo total / unidades producidas;
- utilidad unitaria = precio de venta - costo unitario; margen = `(precio - costo) / precio * 100`; trata explícitamente precio cero para evitar división por cero;
- solo el Administrador acepta un nuevo costo de referencia; una compra excepcional no lo cambia;
- compras pueden recibir precio total o unitario y calculan el faltante de forma coherente;
- una venta exige turno abierto y un usuario tiene como máximo uno;
- ventas guardan snapshots de precio y costo, sin recalcular historia;
- una merma confirmada reduce stock y no puede superar el stock registrado;
- conteos físicos conservan la diferencia y no inventan su causa;
- alertas siguen `Pending → Reviewed → Resolved` y mantienen trazabilidad.

Revisa precisión y redondeo de dinero y cantidades según los tipos implementados. Reporta `number`/coma flotante cuando exista una ruta concreta a resultados financieros inconsistentes. No impongas una librería antes de que el proyecto decida su estrategia.

### Decisión pendiente sobre stock de ventas

La Wiki permite una venta con stock registrado cero (`BR-009`), pero también propone impedir stock negativo en base de datos mientras la venta reduce stock. No marques automáticamente una de estas conductas como correcta. Si un cambio depende de esa contradicción, exige que la PR documente y pruebe una política coherente antes de aprobarlo.

## Prioridad 3: atomicidad, asincronía y concurrencia

- Compras, producción, ventas, conciliaciones y correcciones que modifican varios registros deben ejecutarse en una transacción. Ninguna falla puede dejar cabecera sin ítems, historial sin stock o solo una mitad de producción.
- Verifica rollback de todos los efectos, incluida la creación de alertas que forme parte de la misma operación.
- Detecta lecturas seguidas de escritura vulnerables a carreras: un único turno abierto, stock suficiente, aceptación de costos, transiciones de estado y conciliaciones necesitan garantías transaccionales y, cuando aplique, constraints o locks.
- Reporta promesas no esperadas, `async` sin `await`, errores asíncronos perdidos, trabajo iniciado después de responder o callbacks que escapan de la transacción.
- Los reintentos solo son seguros si la operación es idempotente o usa una clave/estado que evita duplicados. No sugieras reintentar mutaciones financieras a ciegas.
- Evita llamadas externas largas dentro de transacciones de base de datos. Gemini no debe mantener locks ni participar en la transacción financiera.

## Prioridad 4: arquitectura y límites

Usa `docs/architecture.md` y la Wiki como arquitectura objetivo, pero da precedencia a decisiones actualizadas y evidencia ejecutable.

- Presentación/API valida y traduce HTTP; aplicación coordina casos de uso; dominio mantiene reglas deterministas; infraestructura adapta PostgreSQL y servicios externos.
- El dominio no debe importar NestJS, TypeORM, HTTP, Gemini ni configuración de infraestructura.
- Los controladores no deben contener cálculos, transacciones complejas ni acceso directo a repositorios.
- Infraestructura no decide autorización ni duplica reglas de negocio.
- Un módulo no debe consultar tablas internas de otro módulo para evitar su contrato; usa casos de uso o interfaces explícitas.
- Frontend organiza lógica de negocio visual por feature. Componentes compartidos no deben adquirir reglas específicas de compras, ventas o inventario.
- No aceptes microservicios, colas, WebSockets, uploads, OCR, pagos, múltiples sucursales u offline como si fueran parte del MVP; requieren una decisión y requisitos explícitos.

La Wiki contiene un diagrama ADR que muestra dominio dependiendo de infraestructura, en conflicto con su texto. Hasta que se resuelva, aplica el principio explícito de dominio independiente y reporta imports concretos que lo rompan; no discutas solo la forma de las carpetas.

## Prioridad 5: errores y observabilidad

- Errores de negocio esperados deben tener códigos estables como `INSUFFICIENT_STOCK`, `SHIFT_REQUIRED`, `SHIFT_ALREADY_OPEN`, `FORBIDDEN`, `RESOURCE_NOT_FOUND`, `INVALID_UNIT_CONVERSION` o `VALIDATION_ERROR` cuando correspondan.
- El mapeo al contrato HTTP debe estar centralizado; evita respuestas distintas para la misma clase de error.
- Usa correctamente `400`, `401`, `403`, `404` y `409` sin revelar si existe un recurso de otro negocio.
- Los errores inesperados devuelven mensaje genérico; nunca stack trace, SQL, nombres internos, credenciales ni detalle de proveedor.
- No aceptes `catch` vacío, errores convertidos silenciosamente en éxito, logs sin contexto o fallos descartados.
- Los logs importantes deben incluir evento estable, nivel, timestamp e identificadores mínimos de operación. Deben permitir correlacionar el fallo sin copiar bodies u objetos completos.
- No registres contraseñas, hashes, tokens, secretos, headers de autorización, prompts con datos sensibles ni información financiera innecesaria.
- Un error de Gemini debe distinguirse de un error de negocio y mantener operativo el núcleo del producto.

## Prioridad 6: rendimiento

Reporta solo riesgos demostrables en la ruta modificada:

- N+1 o consultas repetidas en listados y cálculos;
- lectura de tablas completas sin filtro por negocio, fecha o paginación;
- recálculo innecesario de costos históricos;
- procesamiento secuencial evitable que cambie latencia de forma significativa;
- índices ausentes cuando una consulta nueva filtra o relaciona repetidamente por `business_id`, claves foráneas o fechas.

No pidas caché, colas o nueva infraestructura sin medición y necesidad real. El objetivo documentado para acciones normales es aproximadamente dos segundos, excluyendo IA y voz.

## Prioridad 7: pruebas

- Exige pruebas para cambios en autenticación, permisos, ownership, conversiones, costos, márgenes, stock, turnos, snapshots históricos, confirmación de IA/voz y transacciones.
- Un bug corregido debe incluir una prueba que falle antes de la corrección cuando sea viable.
- Incluye casos límite: cero, negativos, unidad incompatible, fecha futura, entidad archivada, negocio ajeno, rol incorrecto, doble turno, error a mitad de transacción y proveedor externo caído.
- Para concurrencia o constraint, una prueba puramente unitaria no basta si el riesgo vive en PostgreSQL.
- No confundas mocks exitosos con prueba de integración real ni snapshots visuales con validación de reglas.
- No exijas E2E para cada CRUD; resérvalos para los flujos críticos documentados.

## Prioridad 8: limpieza relevante

- Reporta comentarios nuevos que narren código obvio, estén desactualizados, oculten deuda o contengan instrucciones temporales. Conserva comentarios que expliquen una decisión no evidente o requisito externo.
- Reporta emojis decorativos agregados al código fuente, logs o mensajes técnicos. No marques iconos legítimos de interfaz, contenido de usuario, accesibilidad o símbolos funcionales.
- Señala nombres que contradigan el dominio o convenciones comprobadas: TypeScript/JSON en `camelCase`, clases/componentes/tipos en `PascalCase`, constantes en `UPPER_SNAKE_CASE` y columnas en `snake_case`.
- Evita observaciones puramente estilísticas que Prettier o ESLint deban resolver automáticamente.

## Formato obligatorio de cada hallazgo

Cada observación debe ser accionable y contener:

```text
[Severidad: Crítica|Alta|Media|Baja] Título breve
Archivo: ruta/al/archivo:línea
Problema: conducta incorrecta demostrable.
Por qué: explicación técnica ligada al código o a una regla identificada.
Riesgo: consecuencia concreta para seguridad, datos, operación o mantenibilidad.
Corrección: cambio específico y verificable recomendado.
```

Usa las severidades así:

- **Crítica:** explotación directa, fuga amplia de datos entre negocios, secreto activo expuesto o corrupción/pérdida generalizada de datos.
- **Alta:** autorización evadible, integridad financiera/inventario comprometida, transacción parcial o fallo crítico probable.
- **Media:** bug funcional, caso límite relevante, observabilidad insuficiente o degradación de rendimiento con impacto real.
- **Baja:** mantenibilidad o limpieza con riesgo concreto y acotado.

Incluye archivo y línea del diff siempre que GitHub los permita. Si no hay hallazgos reales, indícalo con claridad y menciona solo riesgos residuales o verificaciones no ejecutadas; no inventes observaciones para completar la revisión.

## Verificaciones automáticas recomendadas

Cuando existan scripts reales, recomienda checks obligatorios de lint, type-check, pruebas, build y migraciones para frontend y backend. Añade escaneo de secretos, dependencias y análisis estático solo mediante herramientas adoptadas y configuradas por el proyecto. La protección de `main` debe exigir los checks pertinentes y revisión humana.

Kilo Code Review produce observaciones; no sustituye tests, validación del servidor, análisis automático, revisión humana ni reglas de protección de rama, y no debe afirmarse que bloquea un merge por sí solo.
