import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function useMic() {
    const language = useSelector((state) => state.i18nReducer.language);
    const [isMicClicked, setIsMicClicked] = useState(false)
	const [transcript, setTranscript] = useState([])
	const [elementIdWhoWasClicked, setElementIdWhoWasClicked] = useState(null)
	const doesThePropExist = useRef(false)

    useEffect(() => {
        let recognition;
		let transcription = ''
        if (isMicClicked) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
			recognition.lang = language === "sp" ? "es-ES" : "en-US";
			
			let previousTranscript 
			recognition.onstart = () => {
				previousTranscript = transcript + ' '
			}
            recognition.onresult = (event) => {
				if(previousTranscript===""){
					transcription = Array.from(event.results)
                    .map((result) => result[0].transcript)
                    .join("");
					setTranscript(transcription.trim());
					
				} else {
					transcription = previousTranscript + Array.from(event.results)
						.map((result) => result[0].transcript)
						.join("");
					if(transcription.length > 50) {
						transcription = transcription.slice(0, 50)
					}
					if(transcription.length <= 50) {
						//if(!transcript[elementIdWhoWasClicked]) {
							//console.log(transcript)
							//const doesThePropExist = transcript.some((e)=>e[elementIdWhoWasClicked] !== undefined)
							//console.log(doesThePropExist)
							setTranscript((prev) => 
								(()=>{
									if (doesThePropExist.current) {
										console.log(prev.findIndex((e)=>e[elementIdWhoWasClicked] !== undefined))
										return [...prev, {[elementIdWhoWasClicked]: transcription.trim()}]
									} else {
										console.log('eee')
										return [...prev, {[elementIdWhoWasClicked]: transcription.trim()}]
									}
								})()
							)
								
						//}
						//console.log(elementIdWhoWasClicked['micEmail'])
						//setTranscript(transcription);
					}
				}
            };

            recognition.start();

            return () => {
                recognition.stop();
            };
        }
    }, [isMicClicked]);

	useEffect(() => {
		const doesThePropExistVar = transcript.some((e)=>e[elementIdWhoWasClicked] !== undefined)
		doesThePropExist.current = doesThePropExistVar
		//console.log(transcript)

	}, [transcript])



	const clickMicHandler = (e) => {
		setElementIdWhoWasClicked(e.target.id)
		setIsMicClicked(!isMicClicked)
	}

	const onChangeHandler = (e) => {		
		if(!isMicClicked) {
			setTranscript(e.target.value)
		} else {
			alert('Solo puede escribir o borrar cuando esta el botón de microfono desactivado')
		}		
	}

    return {
        isMicClicked,
        transcript, 
        onChangeHandler,
        clickMicHandler,
		elementIdWhoWasClicked
    }
}
