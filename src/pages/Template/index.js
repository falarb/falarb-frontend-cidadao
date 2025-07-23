import { Outlet } from "react-router-dom"
import MainContainer from "../../components/MainContainer"
import Header from "../../components/Header"
import Menu from "../../components/Menu"

export default function Template() {

    return (
        <div>
            <Header/>
            <Menu/>
            <MainContainer>
                <Outlet />
            </MainContainer>
        </div>
    )

}