# README

1. Crear bucket de s3. Default: "cloudformation-liberty" y cargar la carpeta /aws de repositorio
2. Crear bucket de s3. Default: "functions-liberty", cargar funciones .zip que estan en la carpeta functions.
3. Lanzar comando de creacion stack master, apuntando al master.yml del bucket de s3 creado en el punto 1.
4. Subir documento HTML al bucket s3. Default: "s3-demo-${Stage}-${CostCenter}"
5. Cargar items a la tabla de dynamo. Default: "${Stage}-inventory-${CostCenter}"

Hola esta es mi primera rama feature/reamde-dev v1.0.0