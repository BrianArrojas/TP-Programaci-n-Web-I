export const CURSOS = [
    {
        id: 1,
        precio: 22000,
        imagen: "../imagenes/amazon-web-services.png",
        duracion: "60hs",
        titulo: "Conceptos de Amazon Web Services",
        descripcion: "Aprenderás los fundamentos de Amazon Web Services.",
        requisitos: "Conocimientos básicos de programación.",
        contenidos: {
            introduccion: {
                clase1: ["Introducción a AWS", 30],
                clase2: ["¿Qué es la computación en la nube?", 25],
                clase3: ["Servicios principales de AWS", 40]
            },
            unidad1: {
                clase1: ["Configuración de una cuenta AWS", 35],
                clase2: ["Introducción a EC2", 20],
                clase3: ["Introducción a S3", 25]
            },
            unidad2: {
                clase1: ["Bases de datos en AWS", 50],
                clase2: ["Introducción a RDS", 25],
                clase3: ["Introducción a DynamoDB", 30]
            }
        },
        docente: {
            nombre: "Fernando Herrera",
            calificacion: 4,
            descripcion: "Desarrollador Full Stack con más de 10 años de experiencia en la industria del software. Especializado en tecnologías web y apasionado por la enseñanza."
        }
    },
    {
        id: 2,
        precio: 15000,
        imagen: "../imagenes/HTML5-and-CSS3.png",
        duracion: "40hs",
        titulo: "Introducción a HTML5 y CSS",
        descripcion: "Aprenderás a estructurar páginas con HTML5 y a aplicar estilos con CSS para crear sitios responsivos y accesibles.",
        requisitos: "Conocimientos básicos de manejo de computadora.",
        contenidos: {
            introduccion: {
                clase1: ["Qué es HTML y CSS", 30],
                clase2: ["Estructura de un documento HTML5", 25],
                clase3: ["Selectores y propiedades básicas de CSS", 40]
            },
            unidad1: {
                clase1: ["Diseño y estructura con HTML5", 35],
                clase2: ["Formularios y accesibilidad", 40],
                clase3: ["Maquetación con Flexbox", 30]
            },
            unidad2: {
                clase1: ["Diseño responsivo con Media Queries", 45],
                clase2: ["Grid Layout básico", 50],
                clase3: ["Buenas prácticas y optimización de assets", 40]
            }
        },
        docente: {
            nombre: "María García",
            calificacion: 4,
            descripcion: "Diseñadora web con experiencia en UX/UI y estándares web, enfocada en accesibilidad y performance."
        }
    },
    {
        id: 3,
        precio: 22000,
        imagen: "../imagenes/JavaScript-logo.png",
        duracion: "60hs",
        titulo: "Curso de JavaScript para Principiantes",
        descripcion: "Domina los fundamentos de JavaScript: sintaxis, DOM, eventos y fundamentos de programación para crear interactividad en la web.",
        requisitos: "Conocimientos básicos de HTML y CSS recomendados.",
        contenidos: {
            introduccion: {
                clase1: ["Historia y ecosistema de JavaScript", 30],
                clase2: ["Variables, tipos y operadores", 20],
                clase3: ["Estructuras de control", 45]
            },
            unidad1: {
                clase1: ["Funciones y alcance (scope)", 50],
                clase2: ["Objetos y arrays", 30],
                clase3: ["Manipulación del DOM y eventos", 35]
            },
            unidad2: {
                clase1: ["Fetch y consumo de APIs", 32],
                clase2: ["Introducción a promesas y async/await", 25],
                clase3: ["Buenas prácticas y debugging", 40]
            }
        },
        docente: {
            nombre: "Juan Pérez",
            calificacion: 5,
            descripcion: "Desarrollador frontend con experiencia en proyectos web interactivos y enseñanza a principiantes."
        }
    },
    {
        id: 4,
        precio: 25000,
        imagen: "../imagenes/Python-Avanzado.png",
        duracion: "80hs",
        titulo: "Curso de Python Nivel Avanzado",
        descripcion: "Profundiza en Python: programación orientada a objetos avanzada, concurrencia, optimización y patrones de diseño aplicados.",
        requisitos: "Conocimientos intermedios de Python y programación.",
        contenidos: {
            introduccion: {
                clase1: ["Repaso de conceptos intermedios de Python", 30],
                clase2: ["Herramientas y entorno de desarrollo", 25],
                clase3: ["Estilos y convenciones (PEP8)", 20]
            },
            unidad1: {
                clase1: ["Programación orientada a objetos avanzada", 30],
                clase2: ["Metaprogramación y decoradores", 25],
                clase3: ["Manejo avanzado de excepciones y context managers", 20]
            },
            unidad2: {
                clase1: ["Concurrencia: threading, multiprocessing y async", 30],
                clase2: ["Optimización de rendimiento y profiling", 35],
                clase3: ["Testing avanzado y despliegue", 40]
            }
        },
        docente: {
            nombre: "Laura Méndez",
            calificacion: 3,
            descripcion: "Ingeniera de software con amplia experiencia en sistemas backend y arquitecturas escalables en Python."
        }
    },
    {
        id: 5,
        precio: 20000,
        imagen: "../imagenes/Python-Intermedio.png",
        duracion: "60hs",
        titulo: "Curso de Python Nivel Intermedio",
        descripcion: "Amplía tus conocimientos de Python con módulos, manejo de archivos, OOP y consumo de APIs para proyectos prácticos.",
        requisitos: "Conocimientos básicos de Python.",
        contenidos: {
            introduccion: {
                clase1: ["Estructuras de datos avanzadas", 30],
                clase2: ["Comprensiones y expresiones generadoras", 25],
                clase3: ["Módulos y paquetes", 20]
            },
            unidad1: {
                clase1: ["Programación orientada a objetos (OOP)", 30],
                clase2: ["Manejo de archivos y persistencia", 25],
                clase3: ["Manejo de errores y logging", 20]
            },
            unidad2: {
                clase1: ["Consumo de APIs y peticiones HTTP", 30],
                clase2: ["Trabajo con bases de datos (SQLite)", 35],
                clase3: ["Introducción a testing con unittest/pytest", 40]
            }
        },
        docente: {
            nombre: "Carlos Ruiz",
            calificacion: 5,
            descripcion: "Desarrollador Python con experiencia en automatización, APIs y enseñanza práctica."
        }
    },
    {
        id: 6,
        precio: 30000,
        imagen: "../imagenes/ml-curso.png",
        duracion: "70hs",
        titulo: "Introducción a Machine Learning",
        descripcion: "Conceptos fundamentales de Machine Learning: modelos supervisados y no supervisados, preprocesamiento y evaluación de modelos.",
        requisitos: "Conocimientos básicos de programación y álgebra lineal recomendados.",
        contenidos: {
            introduccion: {
                clase1: ["Qué es Machine Learning y aplicaciones", 25],
                clase2: ["Pipeline de un proyecto de ML", 30],
                clase3: ["Herramientas y librerías (scikit-learn, pandas)", 35]
            },
            unidad1: {
                clase1: ["Modelos supervisados: regresión y clasificación", 40],
                clase2: ["Selección de características y preprocesamiento", 45],
                clase3: ["Evaluación de modelos y métricas", 50]
            },
            unidad2: {
                clase1: ["Modelos no supervisados: clustering", 55],
                clase2: ["Reducción de dimensionalidad", 60],
                clase3: ["Introducción a modelos avanzados y buenas prácticas", 65]
            }
        },
        docente: {
            nombre: "Ana López",
            calificacion: 5,
            descripcion: "Científica de datos con experiencia en proyectos de ML aplicados a industria y docencia universitaria."
        }
    }
]