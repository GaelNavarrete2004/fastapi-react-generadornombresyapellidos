from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Ajusta el puerto según tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint para obtener nombres
@app.get("/nombres")
async def obtener_nombres():
    return ["Juan", "María", "Pedro", "Ana", "Luis", "Carmen", "José", "Isabel", 
            "Francisco", "Elena", "Carlos", "Sofía", "Fernando", "Lucía", "Manuel", 
            "Clara", "David", "Laura", "Javier", "Patricia"]

# Endpoint para obtener apellidos
@app.get("/apellidos")
async def obtener_apellidos():
    return ["García", "Rodríguez", "López", "Martínez", "González", "Pérez", 
            "Sánchez", "Ramírez", "Torres", "Flores", "Hernández", "Ruiz", 
            "Morales", "Ortiz", "Castillo", "Ramos", "Vargas", "Mendoza", 
            "Chávez", "Jiménez"]

# Ejecutar la aplicación FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
