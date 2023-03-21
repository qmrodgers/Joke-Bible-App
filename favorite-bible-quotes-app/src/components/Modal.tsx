import React, { useState, useEffect }from 'react'
import '../styles/Modal.css'
export type ModalContent = {
    heading?: string,
    subheading?: string,
    paragraph?: string,
    customCss?: React.CSSProperties,
    button?: React.FunctionComponent<ButtonProps>
    onLoad?: CallbackFunction,
    escape?: boolean
    enabled?: boolean;
    }

type CallbackFunction = (...args: any[]) => void;    

export type ButtonProps = {
    buttonText?: string,
    href?: string,
    func?: CallbackFunction,
    }

export const ModalButton: React.FunctionComponent<ButtonProps> = ({buttonText, href, func}) => {
    return <a href={href ?? '#'} onClick={func ?? (() => {})}><button>{buttonText}</button></a>
}

export function Modal(content: ModalContent) {
const [enabled, setEnabled] = useState(content.enabled ? true : false);

    function closeModal() {
        setEnabled(false);
    }

    useEffect(() => {
        if (!enabled) return;
        
        
        if (content.onLoad)
        content.onLoad();
        


        }, [enabled]);
        


if (!enabled) return <></>; //return nothing on disabled

//return if enabled
return <div className='modalWrapper'>
        {content.escape ? <button className='x' onClick={closeModal}>&#x2715;</button> : null}
        <div className='modal animate-background' style={content.customCss}>
        <h1>{content.heading ?? null}</h1>
        <h4>{content.subheading ?? ''}</h4>
        <p>{content.paragraph ?? ''}</p>
        {content.button ? React.createElement(content.button) : null}
        </div>
        </div>

    }
