import { S } from './style'
import { BackButtonNavigateProps } from '../../type/type';
import {useNavigate} from "react-router-dom";

function BackButton(props: BackButtonNavigateProps) {
    const { route } = props;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(route);
    }

    return (
        <S.Container>
            <S.BackButton onClick={handleNavigate}/>
        </S.Container>
    );
}
export default BackButton;