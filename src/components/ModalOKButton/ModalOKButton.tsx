import React from 'react'
import { S } from './style'
import { ModalOKButtonProps } from '../../type/type';

function ModalOKButton(props: ModalOKButtonProps) {
    const { buttonName } = props;

    return (
        <>
            <S.ModalOKButton 
                type="submit"
            >
                {buttonName}
            </S.ModalOKButton>
        </>
    )
}

export default ModalOKButton;
