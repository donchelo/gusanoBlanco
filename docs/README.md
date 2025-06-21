# Gusano Blanco - Proyecto p5.js

Un proyecto de animación y simulación de criaturas usando p5.js.

## Estructura del Proyecto

```
gusano-blanco/
├── index.html              # Archivo principal HTML
├── assets/                 # Recursos multimedia
│   ├── images/            # Imágenes y sprites
│   ├── sounds/            # Efectos de sonido y música
│   └── fonts/             # Fuentes personalizadas
├── css/                   # Estilos CSS
│   └── style.css          # Estilos principales
├── js/                    # Código JavaScript
│   ├── main.js            # Archivo principal (sketch p5.js)
│   ├── config/            # Configuraciones
│   │   └── config.js      # Configuración del proyecto
│   ├── utils/             # Utilidades y helpers
│   │   └── palettes.js    # Paletas de colores
│   ├── components/        # Componentes reutilizables
│   │   ├── segment.js     # Segmentos de criaturas
│   │   └── limb.js        # Extremidades
│   ├── creatures/         # Sistema de criaturas
│   │   ├── base/          # Clases base
│   │   │   └── creature.js
│   │   ├── worms/         # Tipos específicos de gusanos
│   │   │   ├── big_worm.js
│   │   │   └── small_worm.js
│   │   └── index.js       # Exportaciones de criaturas
│   └── scenes/            # Escenas del juego
│       └── game-scene.js
└── docs/                  # Documentación
    └── README.md
```

## Características

- **Sistema modular**: Código organizado en módulos reutilizables
- **Sistema de criaturas**: Arquitectura extensible para diferentes tipos de criaturas
- **Configuración centralizada**: Todas las configuraciones en un solo lugar
- **Utilidades**: Funciones helper y paletas de colores
- **Componentes**: Elementos reutilizables como segmentos y extremidades

## Cómo usar

1. Abre `index.html` en tu navegador
2. El proyecto se ejecutará automáticamente
3. Usa los controles para interactuar con las criaturas

## Desarrollo

### Agregar una nueva criatura

1. Crea un nuevo archivo en `js/creatures/worms/`
2. Extiende la clase base `Creature`
3. Agrega la exportación en `js/creatures/index.js`

### Agregar un nuevo componente

1. Crea el archivo en `js/components/`
2. Asegúrate de que sea reutilizable
3. Importa en `main.js` según sea necesario

## Mejores Prácticas

- **Separación de responsabilidades**: Cada archivo tiene una función específica
- **Nomenclatura consistente**: Usa camelCase para variables y PascalCase para clases
- **Comentarios**: Documenta funciones complejas
- **Modularidad**: Mantén los archivos pequeños y enfocados
- **Configuración**: Usa el archivo config.js para valores ajustables

## Tecnologías

- **p5.js**: Biblioteca de gráficos y animación
- **JavaScript ES6+**: Sintaxis moderna de JavaScript
- **HTML5**: Estructura del proyecto
- **CSS3**: Estilos y animaciones 