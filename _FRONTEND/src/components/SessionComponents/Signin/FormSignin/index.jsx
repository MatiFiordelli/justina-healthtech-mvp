import React, { useEffect, useState } from "react";
import Input from "../../../Resources/FormElements/InputLabel/Input";
import Form from "../../../Resources/FormElements/Form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import i18n from "../../../../i18n/session/signin/index.json";
import Button from "../../../Resources/FormElements/Button";
import micOn from "../../../../assets/svg/icons/micOn.svg";
import micOff from "../../../../assets/svg/icons/micOff.svg";
import useMic from "../../../../hooks/useMic";

export default function FormSignin({ handleSubmit }) {
    const language = useSelector((state) => state.i18nReducer.language)
    const navigate = useNavigate();
	const {isMicClicked, transcript, onChangeHandler, clickMicHandler, elementIdWhoWasClicked} = useMic(language)

	return (
		<Form handleSubmit={(e) => handleSubmit(e)}>
			<div className="flex justify-center items-center gap-2 w-full">
				<Input
					id={"email"}
					type={"email"}
					placeholder={i18n[language].emailPlaceholder}
					title={i18n[language].emailTitle}
					isRequired={true}
					autoFocus={true}
					value={/* elementIdWhoWasClicked === "micEmail" && */ transcript.some((e)=>e.hasOwnProperty('micEmail'))? transcript[0]['micEmail'] :" "}
					onChangeHandler={onChangeHandler}
					maxLength="50"
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
				/>
				<img 
					id="micEmail"
					className={`w-9 ${
						elementIdWhoWasClicked === "micEmail" && isMicClicked
							? "border-2 border-green-400"
							: "border-non1e"
					} rounded-full cursor-pointer transition-all duration-100 `}
					src={micOn} 
					onClick={(e) => clickMicHandler(e)}
				/>
			</div>

			<div className="flex justify-center items-center gap-2 w-full">
				<Input
					id={"password"}
					type={"password"}
					placeholder={i18n[language].passwordPlaceholder}
					title={i18n[language].passwordTitle}
					isRequired={true}
					value={/* elementIdWhoWasClicked === "micPassword" && */ transcript.some((e)=>e.hasOwnProperty('micPassword')) && transcript[0]['micPassword'] || " "}
					onChangeHandler={() => {}}
					minLength="8"
					maxLength="16"
					pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
				/>
				<img 
					id="micPassword"
					className={`w-9 ${
						elementIdWhoWasClicked === "micPassword" && isMicClicked
							? "border-2 border-green-400"
							: "border-non1e"
					} rounded-full cursor-pointer transition-all duration-100 `}
					src={micOn} 
					onClick={(e) => clickMicHandler(e)}
				/>
			</div>

			<p
				className="text-end sm:text-center"
				role="button"
				title={i18n[language].forgotPasswordTitle}
				aria-label={i18n[language].forgotPasswordTitle}
				onClick={() => navigate()}
			>
				{i18n[language].forgotPasswordText}
			</p>

			<Button
				type="submit"
				text={i18n[language].buttonSigninText}
				title={i18n[language].buttonSigninTitle}
				textColor="#FFF"
			/>
		</Form>
	);
}
