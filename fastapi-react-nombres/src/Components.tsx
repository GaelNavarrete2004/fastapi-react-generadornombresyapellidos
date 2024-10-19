'use client'

import { useState, useEffect } from 'react'

// Función para generar un color aleatorio en formato HSL
const randomColor = () => `hsl(${Math.random() * 360}, 70%, 80%)`

// Función para generar un avatar simple basado en iniciales
const Avatar = ({ name }: { name: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('')
  const bgColor = randomColor()

  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  )
}

export default function Component() {
  const [nombres, setNombres] = useState<string[]>([])
  const [apellidos, setApellidos] = useState<string[]>([])
  const [selectedName, setSelectedName] = useState('')
  const [selectedLastName, setSelectedLastName] = useState('')
  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)

  // useEffect para cargar los nombres y apellidos desde la API de FastAPI
  useEffect(() => {
    const fetchNamesAndSurnames = async () => {
      try {
        const resNames = await fetch('http://localhost:8000/nombres')
        const resSurnames = await fetch('http://localhost:8000/apellidos')

        if (!resNames.ok || !resSurnames.ok) {
          throw new Error('Error al obtener los datos')
        }

        const names = await resNames.json()
        const surnames = await resSurnames.json()

        setNombres(names)
        setApellidos(surnames)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching names and surnames:', error)
        setLoading(false)
      }
    }

    fetchNamesAndSurnames()
  }, [])

  const generateRandomName = () => {
    setSpinning(true)
    let counter = 0
    const interval = setInterval(() => {
      if (nombres.length > 0 && apellidos.length > 0) {
        setSelectedName(nombres[Math.floor(Math.random() * nombres.length)])
        setSelectedLastName(apellidos[Math.floor(Math.random() * apellidos.length)])
      }
      counter++
      if (counter > 20) {
        clearInterval(interval)
        setSpinning(false)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-4">
          <h1 className="text-white text-center text-2xl font-bold">Máquina de Nombres Aleatorios</h1>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <Avatar name={`${selectedName} ${selectedLastName}`} />
                <h2 className="mt-4 text-2xl font-bold">
                  {selectedName || '______'} {selectedLastName || '______'}
                </h2>
              </div>
              <button
                onClick={generateRandomName}
                disabled={spinning || nombres.length === 0 || apellidos.length === 0}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {spinning ? 'Generando...' : '¡Generar Nombre Aleatorio!'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
