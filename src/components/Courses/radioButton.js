import {Box, Button, Flex, useColorModeValue, useRadio} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

export default function RadioButton({isReset, ...props}) {
    const {getInputProps, getRadioProps} = useRadio(props)
    const input = getInputProps()
    const checkbox = getRadioProps()

    const bgButton = useColorModeValue('purple.400', 'orange.200')
    const bgButtonChecked = useColorModeValue('purple.600', 'orange.400')
    const colorButton = useColorModeValue('white', 'black')

    return (
        <Box as='label'>
            <input {...input} />
            {/*<Box {...checkbox} >*/}
            {/*    {props.children}*/}
            {/*</Box>*/}
            <Flex
                {...checkbox}
                align={'center'}
                cursor='pointer'
                px={6}
                py={4}
                borderRadius='md'
                boxShadow='md'
                minW={'max-content'}
                mx={{base: 10, sm: 0}}
                bgColor={bgButton}
                color={colorButton}
                id={isReset ? 'reset' : ''}

                _hover={{transform: 'scale(1.05)'}}
                _checked={{transform: 'scale(1.05)', bgColor: bgButtonChecked, color: colorButton}}
            >
                {isReset && (
                    <CloseIcon/>
                )}
                {props.children}
            </Flex>
        </Box>
    )
}