import { Outlet } from "react-router-dom";
import MainContainer from "../../components/MainContainer";

export default function Template() {

    return (
        <div>
            <MainContainer>
                <Outlet />
            </MainContainer>
        </div>
    )

}