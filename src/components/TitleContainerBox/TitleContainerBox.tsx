import { S } from './style'
import { TitleContainerBoxProps } from '../../type/type';

function TitleContainerBox(props: TitleContainerBoxProps) {
    const { title } = props;

    return (
        <S.TitleContainerBox>
            {title}
        </S.TitleContainerBox>
    );
}
export default TitleContainerBox;