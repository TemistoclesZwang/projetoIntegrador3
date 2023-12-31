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
    linkSize: {
      base: "15px",
      sm: "18px",
      md: "21px",
      lg: "25px",
      xl: "30px",
    },
  },
  colors: {
    brand: {
      900: 'black',
    },
    highlights: {
      50: '#CDFF16',
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
