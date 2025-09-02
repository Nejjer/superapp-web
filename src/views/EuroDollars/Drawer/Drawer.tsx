import { Button, Drawer as ChakraDrawer, Portal, Stack, Separator, Input } from "@chakra-ui/react"
import { FC, useState } from "react"
import styles from './styles.module.scss'
import { getZMToken, setZMToken } from "../../../utils/ZMToken"
import { toaster } from "../../../components/ui/toaster"

export const Drawer: FC = () => {
    const [open, setOpen] = useState(false)
    const [token, setToken] = useState(getZMToken());

    const handleClickSave = () => {
        setZMToken(token);
        toaster.create({
            description: "Токен сохранен!",
            type: "success",
        })
        setOpen(false)
    }

    return (
        <ChakraDrawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={'start'}>
            <ChakraDrawer.Trigger asChild>
                <Button variant={"outline"} className={styles.btn}>Настройки</Button>
            </ChakraDrawer.Trigger>
            <Portal>
                <ChakraDrawer.Backdrop />
                <ChakraDrawer.Positioner>
                    <ChakraDrawer.Content>
                        <ChakraDrawer.Body>
                            <Stack justifyContent={'end'} height={'100%'}>
                                <Input value={token} onChange={(e) => setToken(e.target.value)} />
                                <Separator />
                                <Button variant={'subtle'} onClick={handleClickSave}>Сохранить</Button>
                            </Stack>
                        </ChakraDrawer.Body>
                    </ChakraDrawer.Content>
                </ChakraDrawer.Positioner>
            </Portal>
        </ChakraDrawer.Root>
    )
}
