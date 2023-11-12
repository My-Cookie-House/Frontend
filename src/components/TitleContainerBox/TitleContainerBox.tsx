import { S } from './style'
import { TitleContainerBoxProps } from '../../type/type';

function TitleContainerBox(props: TitleContainerBoxProps) {
    const { title } = props;

    return (
        <S.Container>
            <S.TitleContainerBox>
            {title}
        </S.TitleContainerBox>
        </S.Container>
    );
}
export default TitleContainerBox;