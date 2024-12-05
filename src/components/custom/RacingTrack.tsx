import Image from "next/image"
import car1 from '@/assets/car1.png'
import car2 from '@/assets/car2.png'
import car3 from '@/assets/car3.png'
import car4 from '@/assets/car4.png'
import car5 from '@/assets/car5.png'
import car6 from '@/assets/car6.png'
import car7 from '@/assets/car7.png'
import { Input } from "../ui/input"
import { Button } from "@/components/ui/button";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { updateQuote } from '@/asyncFunctions/updateQuote';
const TypingMetrics = require('typing-metrics');
const typingMetrics = new TypingMetrics();

function RacingTrack() {
    // const cars = [car1, car2, car3, car4, car5, car6, car7]
    const cars = [car1];
    const [data, setData] = useState({ content: 'Loading...', author: 'loading...' });
    const [quoteToMatch, setQuotes] = useState('');
    const [correctText, setCorrectText] = useState('');
    // const [positionChangeRate, setPositionChangeRate] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const carDivRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLImageElement>(null);
    const [wrongInputCounter, setWrongInputCounter] = useState(0);
    const [inputHistory, setInputHistory] = useState('');
    const [startingTime, setStartingTime] = useState(0);
    const [isTypingStarted, setIsTypingStarted] = useState(false);
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const [timeCounter, setTimeCounter] = useState(120);
    const [wrongKeyStroke, setWrongKeyStroke] = useState('');
    const [position, setPosition] = useState(1);
    const [typingMatricsData, setTypingMatricsData] = useState({
        "wordsPerMinute": 0,
        "accuracy": 0,
        "msdErrorRate": 0,
        "kspc": null,
        totalTime: 0
    });

    const [timeInterval, setTimeInterVal] = useState<any>();

    const clearInputField = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    // step:1=get a qoute. handleQoute function request for the new qoutes using the api and get an object containing quote and it's information
    const handleQoute = async () => {
        const qouteInformation = await updateQuote();
        setData(qouteInformation)
        setQuotes(qouteInformation.content)
        setInputHistory('');
        setCorrectText('');
        setIsTypingStarted(false);
        setIsTypingFinished(false);
        setTimeCounter(120);
        clearInputField();
        setWrongKeyStroke('');
        setPosition(0);
        setTypingMatricsData({
            "wordsPerMinute": 0,
            "accuracy": 0,
            "msdErrorRate": 0,
            "kspc": null,
            totalTime: 0
        })
    }

    // after getting the qoutes it get render to let the player starting the game.

    //step:4=showing the results. getTypingMetrics function calls typingMetrics a method with quote that is to type, quote that is typed by user, and total time
    const getTypingMetrics = (time: number) => {
        const metrics = typingMetrics.calculateMetrics(quoteToMatch, quoteToMatch, time);
        // these are for resetting all the state to run a new game it is mandatory.
        setTypingMatricsData({ ...metrics, totalTime: time });
        setIsTypingStarted(false);
        setIsTypingFinished(true);
        setTimeCounter(120);
        clearInputField();
        clearInterval(timeInterval);
    }

    // step:3= keeping track of wrong key strokes. 
    const handleSetInputHistory = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            setInputHistory(correctText);
            clearInputField();
        }
        // start the time limit.
        if (!isTypingStarted) {
            setStartingTime(Date.now());
            setIsTypingStarted(true);
            const interval = setInterval(() => {
                setTimeCounter(prevTimeCounter => prevTimeCounter - 1);
            }, 1000)
            setTimeInterVal(interval)
            // clear the time interval automatically if no action happens after 120sec
            setTimeout(() => {
                clearInterval(interval);
            }, 1000 * 120)
        }
    }

    const calcTheCarSpaceInPerc = () => {
        const Trackwidth = carDivRef.current?.offsetWidth;
        const Carwidth = carRef.current?.offsetWidth;
        if (Trackwidth && Carwidth) {
            const spacePercentage = Math.round((Carwidth / Trackwidth) * 100);
            return spacePercentage;
        }
        return 6; // 6 cause the image size may be closer to 6% of the total width.
    }

    // step:2= handle the user typing. Is it correct or not? if correct make them green, if wrong then red otherwise black. keep track and counting to the wrong key srokes. After finshing all the typing call getTypingMetrics(TotalTime); function to get the metrics like wpm,accuracy.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        let value = e.target.value;
        value = inputHistory + value;
        const matchText = quoteToMatch.slice(0, value.length);
        if (value === quoteToMatch) {
            const finishTime = Date.now();
            const TotalTime = (finishTime - startingTime) / 1000; // dividing with 1000 to get seconds

            getTypingMetrics(TotalTime);
        }
        if (value === matchText) {
            /* setting position of car according to the typer's typing. */
            const howPerc = Math.floor((matchText.length / quoteToMatch.length) * 100)
            // if condition is for removeing the car width from calculation of position otherwise it will overflow.
            if (howPerc <= calcTheCarSpaceInPerc()) {
                setPosition(0);
            } else {
                setPosition(howPerc - calcTheCarSpaceInPerc());
            }
            setWrongInputCounter(0);
            setCorrectText(value);
            const newText = quoteToMatch.slice(value.length, quoteToMatch.length);
            setData({ ...data, content: newText })
        } else {
            setWrongInputCounter(prev => prev + 1);
            const key = value[value.length - 1];
            setWrongKeyStroke(prev => prev + key);
        }
    }
    console.log(position)

    // step:5= formating wrong key strokes to let the user know which key is typed wrong and how many time?
    const getKeyStrokeInformationString = (inputStr: string) => {
        // first I have to make uniqe str that has no duplicate values from str
        let charCount = {};
        let formattedStr = "";

        // Count occurrences of each character
        for (let char of inputStr) {
            if (char === " ") {
                char = "  ";
            }
            charCount[char] = (charCount[char] || 0) + 1;
        }

        // Construct the formatted string
        for (let char in charCount) {
            if (charCount[char] > 1) {
                formattedStr += `${char}(${charCount[char]}), `;
            } else {
                formattedStr += `${char}, `;
            }
        }

        // Remove trailing comma and space
        formattedStr = formattedStr.slice(0, -2);

        return formattedStr;
        // I want return a string like this: s(2), d(4), z, 5(10)  here the number in brucket refers to how many times this stroke has pressed as wrong key      
    }

    // this sets up the initial qoutes and it's relational work
    useEffect(() => {
        handleQoute();
        setInputHistory('');
        setIsTypingStarted(false);
        // Clearing interval when the component unmounts
        return () => {
            clearInterval(timeInterval);
        };
    }, [])

    // time interval clearing, otherwise it will cause memory leak.
    useEffect(() => {
        // when typing is finished clear time interval
        if (isTypingFinished) {
            clearInterval(timeInterval);
        }
    }, [isTypingFinished]);

    // useEffect(() => {
    //     const Trackwidth = carDivRef.current?.offsetWidth;
    //     const Carwidth = carRef.current?.offsetWidth;
    //     if (Trackwidth && Carwidth) {
    //         const perClickPosition = (Trackwidth - Carwidth) / quoteToMatch.length;
    //         console.log(perClickPosition, 'per click')
    //         setPositionChangeRate(perClickPosition);
    //     }
    // }, [quoteToMatch])

    return (
        <div className="shadow-lg rounded mx-auto mt-4 max-w-[700px] p-4">
            <div className="text-xl font-bold flex justify-between">
                <h1 className="text-blue-700">{isTypingFinished ? 'Race has been finished' : 'Ready, To Rock!'}</h1>
                {isTypingStarted && <samp>{timeCounter}sec</samp>}
            </div>
            <div className="w-full min-h-[80px]">
                {cars.map((car) => <div ref={carDivRef} key={car.src} className={`pt-4 object-contain border-b border-dashed border-yellow-600 w-full`}>
                    <Image ref={carRef} style={{ left: position > 90 ? position - 5 + '%' : position + '%' }} className={`relative`} src={car} width={80} alt="" />
                </div>)}
            </div>
            {!isTypingFinished && <div className="bg-blend-overlay bg-sky-100 bg-opacity-45 rounded-lg mt-4 p-4 border border-sky-100">
                <div className="font-semi-bold text-xl" >
                    <span className="text-green-700">{correctText}</span>
                    {
                        <>
                            <span className="text-red-700">{wrongInputCounter > 0 ? data.content.slice(0, wrongInputCounter) : ''}</span>
                            <span>{wrongInputCounter > 0 ? data.content.slice(wrongInputCounter, data.content.length) : data.content}</span>
                        </>
                    }
                    <div>
                        <q className="mt-2 text-sm"><em>-{data.author}</em></q>
                    </div>
                </div>
                <div className="mt-4">
                    <Input onKeyDown={handleSetInputHistory} ref={inputRef} onChange={handleChange} placeholder="Write here" className="font-semibold text-black text-xl" />
                </div>
            </div>}
            {
                isTypingFinished &&
                <div className="flex flex-row-reverse gap-2 my-4">
                    <div className="h-fit w-[20%] flex justify-end">
                        <Button onClick={handleQoute}>Race Again</Button>
                    </div>
                    <div className="w-[80%] flex gap-4 justify-between font-bold text-xl">
                        <div className="flex flex-col">
                            <samp>WPM: {typingMatricsData.wordsPerMinute}</samp>
                            <samp>Wrong Key Strokes: {getKeyStrokeInformationString(wrongKeyStroke)}</samp>
                        </div>
                        <div className="flex flex-col">
                            <samp className="text-nowrap">Accuracy: {typingMatricsData.accuracy}%</samp>
                            <samp className="text-nowrap">Total Time: {typingMatricsData.totalTime} sec</samp>
                            {/* <samp>KSPC: {Number.isNaN(typingMatricsData.kspc) ? 0 : typingMatricsData.kspc}</samp> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RacingTrack