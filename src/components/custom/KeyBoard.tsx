import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const KeyBoard = () => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyboardChange = (input: string) => {
        setInputValue(input);
    };

    return (
        <div className='max-w-[90%] mx-auto mt-4'>
            <Keyboard physicalKeyboardHighlight />
        </div>
    );
};

export default KeyBoard;
