import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, Highlight, extendTheme } from '@chakra-ui/react'
import { color } from 'framer-motion'



const theme = extendTheme({
  fonts: {
    body: "Times New Roman, serif",
    heading: "Times New Roman, serif",
  },
  textStyles: {
    responsiveText: {
      base: {
        fontSize: { base: '16px', sm: '18px', md: '20px', lg: '24px', xl: '28px' }, // Tamanho base do texto
      },
      sm: {
        fontSize: { base: '16px', sm: '18px', md: '20px', lg: '24px', xl: '28px' }, // Tamanho para resoluções pequenas
      },
      md: {
        fontSize: { base: '16px', sm: '18px', md: '20px', lg: '24px', xl: '28px' }, // Tamanho para resoluções médias
      }
    }
  },
  colors: {
    brand: {
      900: 'black',
    },
    highlights: {
      50: '#98FB98',
      80: '#4848d9',
      100: '#191970',
      // Add more shades as needed
    },
    
    gray: {
      // You can define different shades of gray here
      50: 'gray',
      // Add more shades as needed
      900: 'black',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
        backgroundColor: 'black',
        color: 'white',
      },
      variants: {
        primary: {
          bg: 'brand.100', // Using the custom color you defined
          _hover: {
            bg: 'brand.50', // Hover color adjustment
          },
        },
      },
    },
    // Other components can be customized similarly
  },
});




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
