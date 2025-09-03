import { Sausage } from "./Sausage";
import { Stack } from "@chakra-ui/react";
import { Drawer } from "./Drawer";
import { useMobxStore } from "../../stores";
import { observer } from "mobx-react-lite";

export const EuroDollars = observer(() => {
    const { euroDollarStore } = useMobxStore()

    return <div>
        <Drawer />
        <Stack gap={4}>
            {euroDollarStore.planItems.map(({ spent, tag }) => <Sausage percentage={(spent / 10000) * 100} suffix={`${spent} ₽`} text={tag.title} key={tag.id} />)}
        </Stack>
    </div>
}
)
