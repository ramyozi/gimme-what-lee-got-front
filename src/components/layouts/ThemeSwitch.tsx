import {Button, useMantineColorScheme} from "@mantine/core";
import {Moon, Sun} from "lucide-react";


const ThemeSwitch = () => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();


    return (
        <Button
            variant="subtle"
            size="sm"
            onClick={toggleColorScheme}
        >
            {colorScheme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
        </Button>
    )


}

export default ThemeSwitch;