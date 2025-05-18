import { Button, Drawer as ChakraDrawer, Portal, IconButton, Stack, Separator } from "@chakra-ui/react"
import { FC, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import styles from './styles.module.scss'
import { useNavigate } from "react-router";
import { useColorMode } from "../ui/color-mode";

export const Drawer: FC = () => {
    const [open, setOpen] = useState(false)
    const navigation = useNavigate();
    const { toggleColorMode } = useColorMode()

    const navigate = (to: string) => {
        setOpen(false)
        navigation(to);
    }

    return (
        <ChakraDrawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <ChakraDrawer.Trigger asChild>
                <IconButton variant={"outline"} className={styles.btn}><RxHamburgerMenu /></IconButton>
            </ChakraDrawer.Trigger>
            <Portal>
                <ChakraDrawer.Backdrop />
                <ChakraDrawer.Positioner>
                    <ChakraDrawer.Content>
                        <ChakraDrawer.Body>
                            <Stack justifyContent={'end'} height={'100%'}>
                                <Button onClick={toggleColorMode}>Toggle theme</Button>
                                <Separator />
                                <Separator />
                                <Button variant={'outline'} onClick={() => navigate('/')}>Compumon</Button>
                                <Button variant={'outline'} onClick={() => navigate('/retro')}>Retro</Button>
                                <Separator />
                                <Button variant={'subtle'} onClick={() => setOpen(false)}>Close</Button>
                            </Stack>
                        </ChakraDrawer.Body>
                    </ChakraDrawer.Content>
                </ChakraDrawer.Positioner>
            </Portal>
        </ChakraDrawer.Root>
    )
}
