import AppHeaderWrapper from "./header/AppHeaderWrapper.tsx";
import {Outlet} from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <AppHeaderWrapper />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </>
    );
}
