import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	const createValidators = () => {
		const formCheckdValues = {};

		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMessage] = formValidations[formField];

			formCheckdValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
		}

		setFormValidation(formCheckdValues);
	};

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) return false;
		}

		return true;
	}, [formValidation]);

	return {
		...formState,
		...formValidation,
		isFormValid,
		formState,
		onInputChange,
		onResetForm,
	};
};
