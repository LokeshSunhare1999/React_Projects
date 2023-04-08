import Loader from 'react-loaders'
import './index.scss'
import AnimationLetters from '../AnimationLetters'
import { useState } from 'react'
import { useEffect } from 'react'

const Contact = () => {
    
    return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>

                    <h1>
                        <AnimationLetters
                            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e',]}
                            idx={15}
                        />
                    </h1>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Contact