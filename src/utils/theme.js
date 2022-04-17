import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"


const breakpoints = createBreakpoints({
  xs:"0em", //0px
  sm: "30em", //480px
  md: "48em", //768px
  lg: "62em", //992px
  xl: "80em", //1280px
  "xxl": "96em",//1536px
})

/**
 * Component: Input
 */
const Input = {
    baseStyle: {
        field: {
        background: 'pink',
        color: 'gray.700',
        },
    },
    defaultProps: {
        focusBorderColor: 'brand.50',
    },
}

/**
 * Component: Button
 */
const Button = {
    baseStyle: { 
        _focus: { 
            boxShadow: 'none' 
        }
    },
    variants: {
        outline: {
            borderColor: 'brand.500',
            color: 'brand.500',
            _hover: {
                borderColor: 'brand.500',
                background: 'brand.500',
                color: 'white'
            },
            _active: {
                color: 'brand.500'
            }
        }
    }
}

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    brand: {
        50: '#e77f5b',
        100: '#e46d43',
        200: '#e05a2c',
        300: '#e05a2c',
        400: '#e05a2c',
        500: '#e05a2c' 
    }
  },
  components: { 
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } }, 
    Button,
    Select: { baseStyle: { _focus: { boxShadow: 'none' } } },
    Input,
  },
  breakpoints,
  config: {
    cssVarPrefix: 'bfp',
  },
  
})

export default theme