# README

1. Crear bucket de s3. Name: "cloudformation-liberty"
1. Crear bucket de s3. Name: "functions-liberty", cargar funciones .zip
2. Lanzar comando de creacion stack master, apuntando al master.yml
3. Subir documento HTML al bucket s3. Default: "s3-demo-dev-liberty"
4. Cargar items a la tabla de dynamo. Default: "dev-inventory-liberty"