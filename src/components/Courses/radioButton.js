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
            <Flex
                {...checkbox}
                align={'center'}
                justify={isReset ? 'center' : 'normal'}
                cursor='pointer'
                px={6}
                py={4}
                borderRadius='md'
                boxShadow='md'
                bgColor={bgButton}
                color={colorButton}

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